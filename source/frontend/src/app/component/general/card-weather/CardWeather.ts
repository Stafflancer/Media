import AbstractBlock from 'app/component/block/AbstractBlock';

export default class CardWather extends AbstractBlock {
  public static readonly displayName: string = 'card-weather';
  private readonly location = this.getElement<HTMLElement>('.card-weather__location');

  constructor(el: HTMLElement) {
    super(el);

    this.geoFindMe();
  }

  private geoFindMe = () => {
    let _this = this;
    if (!navigator.geolocation) {
      console.log('您的浏览器不支持地理位置');
      return;
    }
    function success(position: any) {
      var latitude = position.coords.latitude;
      var longitude = position.coords.longitude;
      _this.location!.innerHTML =
        '<p>Latitude' + latitude + '° <br>Longitude is ' + longitude + '°</p>';
    }
    function error() {
      console.log('geolocation error 无法获取您的位置');
    }
    navigator.geolocation.getCurrentPosition(success, error);
  };

  public dispose() {
    super.dispose();
  }
}
