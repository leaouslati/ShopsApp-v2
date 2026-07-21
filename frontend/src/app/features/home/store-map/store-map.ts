import { AfterViewInit, Component, inject, OnDestroy } from '@angular/core';
import * as L from 'leaflet';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-store-map',
  imports: [TranslatePipe],
  templateUrl: './store-map.html',
  styleUrl: './store-map.css',
})
export class StoreMap implements AfterViewInit, OnDestroy {
  private translate = inject(TranslateService);
  private map: L.Map | undefined;

  private onResize = (): void => {
    this.map?.invalidateSize();
  };

  stores = [
    { key: 'STORE_MAP.STORES.BEIRUT_TECH_STORE', lat: 33.8938, lng: 35.5018 },
    { key: 'STORE_MAP.STORES.TRIPOLI_POS_CENTER', lat: 34.4367, lng: 35.8497 },
    { key: 'STORE_MAP.STORES.SIDON_SMART_STORE', lat: 33.5633, lng: 35.3722 },
    { key: 'STORE_MAP.STORES.BYBLOS_DIGITAL_SHOP', lat: 34.1211, lng: 35.6517 },
    { key: 'STORE_MAP.STORES.JOUNIEH_PAY_HUB', lat: 33.9813, lng: 35.6219 },
    { key: 'STORE_MAP.STORES.ZAHLEH_TECH_POINT', lat: 33.8492, lng: 35.9017 },
    { key: 'STORE_MAP.STORES.TYRE_POS_CENTER', lat: 33.2705, lng: 35.2038 },
    { key: 'STORE_MAP.STORES.BAALBEK_TECH_HUB', lat: 34.2956, lng: 36.2094 },
    { key: 'STORE_MAP.STORES.DAMOUR_PAY_POINT', lat: 33.7183, lng: 35.5639 }
  ];

  private defaultIcon = L.icon({
    iconUrl: 'assets/leaflet-images/marker-icon.png',
    iconRetinaUrl: 'assets/leaflet-images/marker-icon-2x.png',
    shadowUrl: 'assets/leaflet-images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  ngAfterViewInit() {
    this.map = L.map('map').setView([33.8938, 35.5018], 8);

    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      attribution: '© OpenStreetMap contributors © CARTO'
    }).addTo(this.map);

    this.translate.get(this.stores.map(s => s.key)).subscribe(translations => {
      this.stores.forEach(store => {
        L.marker([store.lat, store.lng], { icon: this.defaultIcon })
          .addTo(this.map!)
          .on('click', () => {
            this.map!.flyTo([store.lat, store.lng], 15);
          });
      });
    });

    window.addEventListener('resize', this.onResize);
  }

  ngOnDestroy() {
    window.removeEventListener('resize', this.onResize);
    this.map!.remove();
  }

  flyToStore(store: { key: string; lat: number; lng: number }) {
    this.map!.flyTo([store.lat, store.lng], 15);
  }

  resetMap() {
    this.map!.setView([33.8938, 35.5018], 8);
  }
}
