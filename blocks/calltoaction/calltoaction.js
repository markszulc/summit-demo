export default function decorate(block) {
    const calltoaction = block.querySelector('div');
    console.log(calltoaction.innerHTML);
    calltoaction.parentNode.removeChild(calltoaction);
    calltoaction.classList.add('ctaheadline');
    const container = document.createElement('div');
    container.classList.add('container');
    const ctabtn = document.createElement("div");
    ctabtn.classList.add('ctabtn');
    ctabtn.innerHTML = '<a id="" href="#" target="_blank" class="btn evo-button"  ><span class="evo-button__focus-border"></span><span class="evo-button__inner-wrapper"><span class="evo-button__content d-flex align-items-center justify-content-center"><span class="evo-button__content__copy">Schedule a consultation</span><span class="evo-button__content__icon ml-2"><evo-icon name="arrow-right"><svg aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" class="icon icon-md icon-fill-text icon-stroke-text " style="" viewBox="0 0 24 24"><path class="icon-arrow-right__arrow" d="M0,7.5v-1A.477.477,0,0,1,.45,6H15L11,1.558a.54.54,0,0,1,0-.71l.639-.7a.419.419,0,0,1,.639,0L17.8,6.28a.8.8,0,0,1,.2.53v.38a.816.816,0,0,1-.2.53l-5.526,6.132a.419.419,0,0,1-.639,0L11,13.142a.529.529,0,0,1,0-.7L15,8H.45A.477.477,0,0,1,0,7.5Z" transform="translate(3 5)"></path></svg></evo-icon></span></span><span class="evo-button__ripple" style="top: 29.9219px; left: 98.4844px;"></span></span></a>';
    container.appendChild(calltoaction);
    container.append(ctabtn);
    block.append(container);
}