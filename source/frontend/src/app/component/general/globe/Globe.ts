import AbstractComponent from '../../AbstractComponent';
import DAT from './mideaGlobe.js';

export default class Globe extends AbstractComponent {
  public static readonly displayName: string = 'globe';
  private readonly container = this.getElement<HTMLElement>('.globe__container');
  private readonly popup = this.getElement<HTMLElement>('.js-popup');
  private readonly title = this.getElement<HTMLElement>('.js-title');
  private readonly temperature = this.getElement<HTMLElement>('.js-temperature');
  private readonly units = this.getElement<HTMLElement>('.js-units');
  private readonly highlight1 = this.getElement<HTMLElement>('.js-highlight1');
  private readonly highlight2 = this.getElement<HTMLElement>('.js-highlight2');
  private readonly close = this.getElement<HTMLElement>('.js-close');

  constructor(el: HTMLElement) {
    super(el);

    this.init()

    this.close!.addEventListener('click', this.handleClose);
  }

  private handlePopup = (
    title: string,
    temperature: string,
    units: string,
    highlight1: string,
    highlight2: string,
  ) => {
    this.title!.innerHTML = title;
    this.units!.innerHTML = units;
    this.temperature!.innerHTML = temperature;
    this.highlight1!.innerHTML = highlight1;
    this.highlight2!.innerHTML = highlight2;
    this.popup!.classList.add('show');
  };

  private init = ()=> {
    let _this = this
    let globe = new DAT.mideaGlobe(this.container, {
      imgDir: '../../assets/globe/',
    });

    globe.animate();

    var xhr: any;

    xhr = new XMLHttpRequest();
    xhr.open('GET', '../../assets/globe/data.json', true);
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          var data = JSON.parse(xhr.responseText);
          for (var i=0;i<data.length;i++) {
            globe.addData(data[i][1], { name: data[i][0], info: data[i][2] }, _this.handlePopup);
          }
          globe.animate();
        }
      }
    };
    xhr.send(null);
  };

  private handleClose = () => {
    this.popup!.classList.remove('show');
  };

  public dispose() {
    super.dispose();
  }
}
