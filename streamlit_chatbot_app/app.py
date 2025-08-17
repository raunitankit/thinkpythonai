import re,csv,os,yaml,streamlit as st
from datetime import datetime
st.set_page_config(page_title="ThinkPythonAI — Classroom Assistant", page_icon="🤖")
KB_DEFAULT={"schedule":"Live demos weekly. Join via the form: https://forms.gle/D8W6ePzfzeszgPFr6","payments":"We accept Zelle at +1 (603) 417-0825. After payment, email your receipt to thinkpythonai@gmail.com.","contact":"Email thinkpythonai@gmail.com or WhatsApp +1 (603) 417-0825.","about":"ThinkPythonAI teaches practical Python, automation and AI basics with projects for students and schools."}
def load_kb(path="kb.yaml"):
  try:
    with open(path,"r") as f: data=yaml.safe_load(f) or {}
  except Exception: data={}
  return {**KB_DEFAULT,**data}
INTENTS={"greet":re.compile(r"\b(hi|hello|hey|good\s*(morning|afternoon|evening))\b",re.I),"schedule":re.compile(r"\b(demo|class|schedule|join|register|enrol|enroll)\b",re.I),"payments":re.compile(r"\b(pay|payment|zelle|price|cost|tuition|fee)\b",re.I),"contact":re.compile(r"\b(contact|email|whats(app)?|phone|reach)\b",re.I),"help":re.compile(r"\b(help|commands|what\s*can\s*you\s*do)\b",re.I)}
def detect_intent(text:str)->str:
  for name,pattern in INTENTS.items():
    if pattern.search(text): return name
  return "fallback"
def reply_for(intent:str,kb:dict)->str:
  if intent=="greet": return "Hi! I'm the ThinkPythonAI assistant. Ask me about the schedule, payments, or how to contact us."
  if intent=="help": return "Try: 'When is the demo?', 'How do I pay?', or 'Contact info'."
  if intent in ("schedule","payments","contact"): return kb.get(intent,KB_DEFAULT.get(intent,"Sorry, I don't have that info yet."))
  return "I'm not sure yet—try 'help' for ideas or ask about schedule, payments, or contact."
def log_turn(path:str,user_text:str,bot_text:str):
  new=not os.path.exists(path)
  with open(path,"a",newline="") as f:
    w=csv.writer(f)
    if new: w.writerow(["timestamp","user","assistant"])
    w.writerow([datetime.utcnow().isoformat(),user_text,bot_text])
kb=load_kb(os.path.join(os.path.dirname(__file__),"kb.yaml"))
st.sidebar.title("ThinkPythonAI Assistant")
st.sidebar.write("**Schedule:**",kb.get("schedule"))
st.sidebar.write("**Payments:**",kb.get("payments"))
st.sidebar.write("**Contact:**",kb.get("contact"))
log_csv=st.sidebar.text_input("Chat log CSV path:",value="chatlog.csv")
if "messages" not in st.session_state:
  st.session_state.messages=[{"role":"assistant","content":"Hi! I'm the ThinkPythonAI classroom assistant. Ask me about schedule, payments, or how to contact us."}]
st.title("Classroom Chat — ThinkPythonAI")
for m in st.session_state.messages:
  with st.chat_message(m["role"]): st.markdown(m["content"])
prompt=st.chat_input("Type your question…")
if prompt:
  st.session_state.messages.append({"role":"user","content":prompt}); 
  with st.chat_message("user"): st.markdown(prompt)
  intent=detect_intent(prompt); answer=reply_for(intent,kb)
  st.session_state.messages.append({"role":"assistant","content":answer}); 
  with st.chat_message("assistant"): st.markdown(answer)
  try: log_turn(log_csv,prompt,answer)
  except Exception as e: st.sidebar.error(f"Could not write log: {e}")