// ===== КАРТА С ТЕМНОЙ ТЕМОЙ (API 2.1) =====

function initMap() {
    // Создаём карту

    const map = new ymaps.Map("map", {
  center: [55.7284, 37.6355],
  zoom: 16,
  controls: ["zoomControl"] // Только кнопки зума
}, {
  scrollZoom: false // Отключить зум колесом
});
map.behaviors.disable('scrollZoom');


    // ----- ТЕМНАЯ ТЕМА ДЛЯ API 2.1 -----
    // Создаём кастомный слой с темными тайлами
    const DARK_MAP = 'custom#dark';
    
    ymaps.layer.storage.add(DARK_MAP, function() {
        return new ymaps.Layer(
            'https://core-renderer-tiles.maps.yandex.net/tiles?l=map&theme=dark&%c&%l'
        );
    });
    
    ymaps.mapType.storage.add(DARK_MAP, new ymaps.MapType('Dark', [DARK_MAP]));
    
    // Применяем темную тему к карте
    map.setType(DARK_MAP);
    // ---------------------------------

    // Метка
    const placemark = new ymaps.Placemark(
        [55.7284, 37.6355],
        { balloonContent: "НИУ ВШЭ, Москва,<br>ул. Малая Пионерская, 12" },
        {
            // ⭐ ВОТ ЭТИ ОПЦИИ ДЛЯ СВОЕЙ КАРТИНКИ
            iconLayout: 'default#image',           // Говорим, что используем картинку
            iconImageHref: 'images/MapPin.svg',    // Путь к твоему SVG
            iconImageSize: [40, 40],               // Размер иконки [ширина, высота]
            iconImageOffset: [-20, -40]            // Смещение, чтобы "носик" указывал на точку
        }
    );

    map.geoObjects.add(placemark);
}

ymaps.ready(initMap);