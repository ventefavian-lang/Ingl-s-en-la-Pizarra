// Intervalos de práctica orientativos: no son una certificación ni un algoritmo adaptativo.
const delays=[1,3,7,14,30];
export function reviewSchedule(previous,score,now=Date.now()){
 const r=previous||{},due=r.due||0;let reviews=r.reviews||0,next=due,qualified=false;
 if(score>=80&&(!due||now>=due)){
  qualified=true;
  if(due)reviews=Math.min(5,reviews+1);
  next=now+delays[Math.min(reviews,delays.length-1)]*86400000;
 }else if(!due)next=now+86400000;
 return{reviews,due:next,qualified};
}
