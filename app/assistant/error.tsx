"use client";
export default function Error({error,reset}:{error:Error&{digest?:string};reset:()=>void}){return(<div className="container p-6"><h2 className="text-xl font-bold">Something went wrong loading the assistant.</h2><p className="mt-2 text-slate-600">{error.message}</p><button onClick={()=>reset()} className="btn btn-primary mt-4">Try again</button></div>)}
