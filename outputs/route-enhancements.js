const style=document.createElement('style');
style.textContent=`.route-editor{display:grid;grid-template-columns:1fr 1fr;gap:12px;padding:17px;border:1px solid #dce8e5;border-radius:9px;background:#f7fbf9;margin-top:18px}.route-editor label{display:block;font-size:10px;font-weight:800;color:#6a818a;margin-bottom:6px}.route-editor input{width:100%;box-sizing:border-box;padding:10px;border:1px solid #dce8e5;border-radius:6px;background:white}.customer-section{grid-column:1/-1;padding:12px 15px 8px;background:#f6fbf9;color:#426b78;font-size:10px;letter-spacing:1px;font-weight:800;text-transform:uppercase;border-right:1px solid #dfe9e7;border-bottom:1px solid #dfe9e7}@media(max-width:600px){.route-editor{grid-template-columns:1fr}}`;
document.head.append(style);

function adminRoutes(){
  const form=document.getElementById('form'),host=document.getElementById('sections');
  if(!form||!host||document.getElementById('route-editor')||form.querySelector('[name="Origin Facility"]'))return;
  const editor=document.createElement('section');editor.id='route-editor';editor.className='route-editor';
  editor.innerHTML='<div><label>Origin Facility</label><input name="Origin Facility" value="Lagos, Nigeria"></div><div><label>Delivery Destination</label><input name="Delivery Destination" value="Abidjan, Côte d’Ivoire"></div>';
  host.append(editor);
  form.addEventListener('submit',()=>{const data=new FormData(form);setTimeout(async()=>{const {supabase}=await import('./supabase.js');await supabase.rpc('update_route_endpoints',{p_key:data.get('Shipment Key'),p_origin:data.get('Origin Facility'),p_destination:data.get('Delivery Destination')})},250)},true);
}
function customerRoutes(){
  const fields=document.getElementById('shipment-details');if(!fields)return;
  const entries=[...fields.querySelectorAll('.field')];
  const read=name=>entries.find(x=>x.querySelector('label')?.textContent===name)?.querySelector('strong')?.textContent;
  const origin=read('Origin Facility'),destination=read('Delivery Destination');
  if(origin){const el=document.querySelector('.route-info .city:first-child strong');if(el)el.textContent=origin}
  if(destination){const el=document.querySelector('.route-info .city:last-child strong');if(el)el.textContent=destination}
  if(fields.dataset.sectioned||!entries.length)return;
  const groups={'Shipment Details':['Shipment Key','Shipment ID'],'Sender Information':['Sender Name','Sender Address','Sender Email'],'Receiver Information':['Receiver Name','Receiver Address','Receiver Email'],'Invoice Details':['Proforma Invoice No','Invoice Date','Due Date','Currency','Payment Method','Payment Mode'],'Shipping Details':['Ship To (Attention)','ETA','Freight Method','Delivery Type','Origin Facility','Delivery Destination'],'Item Details':['Description','Unit(s)','Unit Price','Shipping','Total Payable','Amount in Words'],'Status Updates':['Status','Location','Message']};
  const byLabel=Object.fromEntries(entries.map(x=>[x.querySelector('label')?.textContent,x]));fields.replaceChildren();Object.entries(groups).forEach(([heading,names])=>{const h=document.createElement('div');h.className='customer-section';h.textContent=heading;fields.append(h);names.forEach(name=>{if(byLabel[name])fields.append(byLabel[name])})});fields.dataset.sectioned='yes';
}
new MutationObserver(()=>{adminRoutes();customerRoutes()}).observe(document.documentElement,{childList:true,subtree:true});
