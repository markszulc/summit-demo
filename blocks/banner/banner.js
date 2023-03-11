export default function decorate(block) {

    const content = block.querySelector('div'); 
    content.classList.add(`container`);
    const bannerpic = block.querySelector('picture');
    bannerpic.parentNode.removeChild(bannerpic);
    const bannerpicdiv = document.createElement("div");
    bannerpicdiv.classList.add(`bannerpic`);
    bannerpicdiv.append(bannerpic);
    content.append(bannerpicdiv);
    block.append(content);

}