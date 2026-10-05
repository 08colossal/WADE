const icons={
  download:'<path d="M12 3v12"/><path d="m7 10 5 5 5-5"/><path d="M5 21h14"/>',
  lock:'<rect x="4" y="10" width="16" height="11" rx="2"/><path d="M6 10V7a6 6 0 0 1 12 0v3"/>',
  check:'<path d="M20 6 9 17l-5-5"/>',
  user:'<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-7 8-7s8 3 8 7"/>',
  box:'<path d="M21 8 12 3 3 8v8l9 5 9-5z"/><path d="M3 8l9 5 9-5"/><path d="M12 13v8"/>',
  cart:'<circle cx="9" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2 3h2l2.6 12.4a2 2 0 0 0 2 1.6h8.8a2 2 0 0 0 2-1.6L22 7H6"/>',
  card:'<rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/>',
  doc:'<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5"/>',
  chat:'<path d="M21 15a2 2 0 0 1-2 2H8l-4 4V5a2 2 0 0 1 2-2h13a2 2 0 0 1 2 2z"/>',
  help:'<circle cx="12" cy="12" r="10"/><path d="M9.1 9a3 3 0 0 1 5.8 1c0 2-3 2-3 4"/><path d="M12 17h.01"/>'
};
function svg(name,w){return `<svg viewBox="0 0 24 24" width="${w||18}" height="${w||18}" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${icons[name]}</svg>`}

const sections=[
{label:"Primeiros passos",navIcon:"check",title:"Veja como é fácil começar a usar o App Wade.",steps:[
  {icon:"download",title:"Baixe o aplicativo",desc:"Na loja de aplicativos do seu celular."},
  {icon:"lock",title:"Abra o App e faça seu Login",desc:"Com seus dados de acesso."},
  {icon:"check",title:"Pronto!",desc:"Você já terá acesso ao painel inicial."}]},
{label:"Conta e acesso",navIcon:"user",title:"Configure sua conta em poucos passos.",steps:[
  {icon:"user",title:"Crie seu cadastro",desc:"Informe nome, e-mail e CEP para localizarmos seu consultor."},
  {icon:"lock",title:"Confirme seus dados",desc:"Valide seu acesso por e-mail ou SMS."},
  {icon:"check",title:"Perfil liberado",desc:"Acesse suas informações a qualquer momento."}]},
{label:"Pedidos",navIcon:"box",title:"Acompanhe seus pedidos do início ao fim.",steps:[
  {icon:"box",title:"Escolha os produtos",desc:"Navegue pelo catálogo Wade dentro do app."},
  {icon:"doc",title:"Envie o pedido",desc:"Revise os itens e confirme com seu consultor."},
  {icon:"check",title:"Acompanhe o status",desc:"Veja cada etapa até a entrega."}]},
{label:"Compras",navIcon:"cart",title:"Finalize suas compras com segurança.",steps:[
  {icon:"cart",title:"Adicione ao carrinho",desc:"Selecione as quantidades desejadas."},
  {icon:"card",title:"Escolha o pagamento",desc:"Boleto, cartão ou PIX, como preferir."},
  {icon:"check",title:"Compra confirmada",desc:"Receba o comprovante na hora."}]},
{label:"Financeiro",navIcon:"card",title:"Tenha o financeiro sempre à mão.",steps:[
  {icon:"doc",title:"Consulte faturas",desc:"Veja valores e vencimentos atualizados."},
  {icon:"card",title:"Acompanhe pagamentos",desc:"Histórico completo de transações."},
  {icon:"check",title:"Baixe comprovantes",desc:"Exporte quando precisar."}]},
{label:"Suporte e ajuda",navIcon:"help",title:"Ajuda rápida sempre que precisar.",steps:[
  {icon:"help",title:"Acesse o FAQ",desc:"Respostas para as dúvidas mais comuns."},
  {icon:"chat",title:"Fale com um consultor",desc:"Atendimento direto pelo app."},
  {icon:"check",title:"Dúvida resolvida",desc:"Volte para o painel quando quiser."}]}
];

const sidebarList=document.getElementById('sidebarList');
const panelTitle=document.getElementById('panelTitle');
const stepsList=document.getElementById('stepsList');
const dotsEl=document.getElementById('dots');
let current=0;

sections.forEach((s,i)=>{
  const li=document.createElement('li');
  li.dataset.index=i;
  li.innerHTML=svg(s.navIcon)+`<span>${s.label}</span>`;
  li.addEventListener('click',()=>goTo(i));
  sidebarList.appendChild(li);
});
sections.forEach(()=>{
  const d=document.createElement('span');
  d.className='dot';
  dotsEl.appendChild(d);
});

function render(i){
  const s=sections[i];
  panelTitle.textContent=s.title;
  stepsList.innerHTML='';
  s.steps.forEach((st,idx)=>{
    const row=document.createElement('div');
    row.className='step';
    row.innerHTML=`<div class="step-icon">${svg(st.icon,20)}</div><div><div class="step-title">${idx+1}. ${st.title}</div><div class="step-desc">${st.desc}</div></div>`;
    stepsList.appendChild(row);
  });
  [...sidebarList.children].forEach((el,idx)=>el.classList.toggle('active',idx===i));
  [...dotsEl.children].forEach((el,idx)=>el.classList.toggle('active',idx===i));
  gsap.fromTo('#panelTitle,.step',{opacity:0,y:14},{opacity:1,y:0,duration:.5,stagger:.06,ease:'power2.out'});
}

function goTo(i){
  current=(i+sections.length)%sections.length;
  render(current);
}

document.getElementById('prevBtn').addEventListener('click',()=>goTo(current-1));
document.getElementById('nextBtn').addEventListener('click',()=>goTo(current+1));

render(0);

document.querySelectorAll('.magnetic').forEach(el=>{
  el.addEventListener('mousemove',e=>{
    const r=el.getBoundingClientRect();
    const x=e.clientX-r.left-r.width/2;
    const y=e.clientY-r.top-r.height/2;
    gsap.to(el,{x:x*0.3,y:y*0.4,duration:.4,ease:'power2.out'});
  });
  el.addEventListener('mouseleave',()=>{gsap.to(el,{x:0,y:0,duration:.5,ease:'elastic.out(1,0.4)'})});
});

document.querySelectorAll('.glow-btn').forEach(el=>{
  el.addEventListener('mousemove',e=>{
    const r=el.getBoundingClientRect();
    el.style.setProperty('--mx',(e.clientX-r.left)+'px');
    el.style.setProperty('--my',(e.clientY-r.top)+'px');
  });
});

if(window.VanillaTilt){
  VanillaTilt.init(document.querySelectorAll('.phone-tilt'),{max:14,speed:400,glare:true,'max-glare':0.35,scale:1.04});
}

window.addEventListener('DOMContentLoaded',()=>{
  gsap.set('[data-reveal]',{opacity:0,y:26});
  gsap.to('[data-reveal]',{opacity:1,y:0,duration:.8,stagger:.08,ease:'power3.out',delay:.1});
  gsap.set('.sidebar li',{opacity:0,x:-16});
  gsap.to('.sidebar li',{opacity:1,x:0,duration:.6,stagger:.06,delay:.5,ease:'power2.out'});
  gsap.set('.phone-wrap',{opacity:0,scale:.85});
  gsap.to('.phone-wrap',{opacity:1,scale:1,duration:.9,stagger:.15,delay:.4,ease:'back.out(1.6)'});
});
