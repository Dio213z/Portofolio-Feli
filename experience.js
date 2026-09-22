"use strict";
(() => {
 const photo=document.querySelector("#profile-photo");
 if(photo){
  const profile=window.PORTFOLIO_PROFILE || {};
  const initials=document.querySelector("#profile-initials");
  let preferred="";
  if(typeof profile.imageUrl === "string" && profile.imageUrl.trim()){
   const raw=profile.imageUrl.trim();
   try { const url=new URL(raw,document.baseURI);
    // Only public web URLs and relative local assets; never script URLs.
    if(["https:","http:"].includes(url.protocol) || (url.protocol==="file:" && !/^[a-z][a-z0-9+.-]*:/i.test(raw) && !raw.startsWith("//"))) preferred=url.href;
   } catch {}
  }
  const files=[...new Set([preferred,"assets/fotoprofil.png","assets/fotoprofil.jpg","assets/fotoprofil.jpeg"].filter(Boolean))];
  photo.alt=typeof profile.imageAlt==="string" && profile.imageAlt.trim()?profile.imageAlt:"Potret Feli Maulidina Azzahira";
  if(typeof profile.objectPosition==="string" && CSS.supports("object-position",profile.objectPosition)) photo.style.objectPosition=profile.objectPosition;
  photo.referrerPolicy="no-referrer";
  let next=0;
  photo.onload=()=>{photo.hidden=false;initials.hidden=true;};
  photo.onerror=()=>{photo.hidden=true;initials.hidden=false;if(next<files.length)photo.src=files[next++];};
  photo.src=files[next++];
 }
})();
