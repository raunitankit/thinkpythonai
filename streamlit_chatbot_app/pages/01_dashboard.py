import re
import pandas as pd
import streamlit as st

st.set_page_config(page_title="Mini Capstone — Student Success Dashboard", page_icon="📊")

st.title("📊 Student Success Dashboard + Q&A")

st.write(
    "Upload your CSV or use the sample data. This dashboard computes KPIs, shows trends, "
    "and lets you ask natural language questions about the data."
)

# ---- Data input ----
uploaded = st.file_uploader("Upload a CSV with columns: Student, Date, Assignment, Score, MaxScore, Late, Attendance", type=["csv"])
if uploaded is not None:
    df = pd.read_csv(uploaded)
else:
    df = pd.read_csv("data/grades.csv")

# Basic cleaning
if "Date" in df.columns:
    df["Date"] = pd.to_datetime(df["Date"], errors="coerce")
if "Score" in df.columns and "MaxScore" in df.columns:
    df["Pct"] = (df["Score"] / df["MaxScore"]) * 100

# ---- KPIs ----
col1, col2, col3, col4 = st.columns(4)
avg_pct = round(df["Pct"].mean(), 1) if "Pct" in df else None
late_count = int((df["Late"].astype(str).str.lower() == "yes").sum()) if "Late" in df else None
attendance_rate = None
if "Attendance" in df:
    present = (df["Attendance"].astype(str).str.lower() == "present").sum()
    attendance_rate = round(100 * present / len(df), 1) if len(df) else None

with col1:
    st.metric("Average %", f"{avg_pct if avg_pct is not None else '—'}")
with col2:
    st.metric("Late submissions", f"{late_count if late_count is not None else '—'}")
with col3:
    st.metric("Attendance %", f"{attendance_rate if attendance_rate is not None else '—'}")
with col4:
    st.metric("Records", len(df))

st.divider()

# ---- Charts ----
if "Date" in df.columns and "Pct" in df.columns:
    st.subheader("Average % over time")
    line = df.groupby("Date", as_index=False)["Pct"].mean().sort_values("Date")
    st.line_chart(line, x="Date", y="Pct", height=260)

if "Student" in df.columns and "Late" in df.columns:
    st.subheader("Late submissions by student")
    late_by_student = (df.assign(LateFlag=df["Late"].astype(str).str.lower().eq("yes"))
                         .groupby("Student", as_index=False)["LateFlag"].sum()
                         .rename(columns={"LateFlag":"LateCount"}))
    st.bar_chart(late_by_student, x="Student", y="LateCount", height=260)

st.divider()

# ---- Q&A Assistant (rule-based) ----
st.subheader("Ask about your data")
if "messages" not in st.session_state:
    st.session_state.messages = [{"role":"assistant","content":"Hi! Ask me about averages, late work, or attendance."}]

for m in st.session_state.messages:
    with st.chat_message(m["role"]):
        st.markdown(m["content"])

def answer_question(q: str) -> str:
    ql = q.lower()

    # Per-student average
    m = re.search(r"(avg|average|score).*(for|of)\s+([a-zA-Z]+)", ql)
    if m and "Pct" in df.columns and "Student" in df.columns:
        name = m.group(3).capitalize()
        sub = df[df["Student"].str.lower() == name.lower()]
        if len(sub):
            return f"{name}'s average is {sub['Pct'].mean():.1f}% across {len(sub)} records."
        return f"I couldn't find any records for {name}."

    # Overall average
    if re.search(r"overall|class|everyone", ql) and "Pct" in df.columns:
        return f"Class average is {df['Pct'].mean():.1f}% across {len(df)} records."

    # Late totals
    if "late" in ql and "Late" in df.columns:
        if "who" in ql or "by student" in ql:
            late = (df.assign(LateFlag=df["Late"].astype(str).str.lower().eq("yes"))
                      .groupby("Student")["LateFlag"].sum().sort_values(ascending=False))
            top = late.head(5).to_string()
            return f"Late submissions by student (top 5):\n\n```
{top}
```"
        total = int((df["Late"].astype(str).str.lower() == "yes").sum())
        return f"There are {total} late submissions in this dataset."

    # Attendance
    if "attendance" in ql and "Attendance" in df.columns:
        present = (df["Attendance"].astype(str).str.lower() == "present").sum()
        rate = 100 * present / len(df) if len(df) else 0
        return f"Attendance rate is {rate:.1f}%."

    # Trend
    if "trend" in ql and "Date" in df.columns and "Pct" in df.columns:
        line = df.groupby("Date", as_index=False)["Pct"].mean().sort_values("Date")
        if len(line) >= 2 and line["Pct"].iloc[-1] > line["Pct"].iloc[0]:
            return "Average percentage is trending up 👍"
        elif len(line) >= 2 and line["Pct"].iloc[-1] < line["Pct"].iloc[0]:
            return "Average percentage is trending down 👀"
        return "Trend looks flat so far."

    return "Try asking: 'overall average', 'late by student', 'attendance rate', or 'average for Alex'."

q = st.chat_input("e.g., 'average for Riya' or 'late by student'")
if q:
    st.session_state.messages.append({"role":"user","content":q})
    with st.chat_message("user"):
        st.markdown(q)
    a = answer_question(q)
    st.session_state.messages.append({"role":"assistant","content":a})
    with st.chat_message("assistant"):
        st.markdown(a)
