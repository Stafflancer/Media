import AbstractComponent from '../../AbstractComponent';
import DAT from './mideaGlobe.js'

export default class Globe extends AbstractComponent {
  public static readonly displayName:string = 'globe';
  private readonly container = this.getElement<HTMLElement>('.globe__container');

  constructor(el:HTMLElement) {
    super(el);

    this.init()
  }

  private init = ()=> {
    let globe = new DAT.mideaGlobe(this.container, {
      imgDir: '../../assets/globe/'
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
            globe.addData(data[i][1], { name: data[i][0] });
          }
          //globe.createPoints();
          globe.animate();
        }
      }
    };
    xhr.send(null);
  }

  public dispose() {
    super.dispose();
  }
}
