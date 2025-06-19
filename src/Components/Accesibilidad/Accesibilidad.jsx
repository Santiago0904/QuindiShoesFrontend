import React, { useEffect } from 'react';

export const Accesibilidad = () => {
  useEffect(() => {
    // Configuración del widget
    window.interdeal = {
      sitekey: 'c05d8e6fb808fbacf64de7b027a85f8a',
      Position: 'Left',
      domains: {
        js: 'https://cdn.equalweb.com/',
        acc: 'https://access.equalweb.com/',
      },
      Menulang: 'ES',
      btnStyle: {
        vPosition: ['80%', '80%'],
        scale: ['0.5', '0.5'],
        color: {
          main: '#2e850f',
          second: '#ffffff',
        },
        icon: {
          outline: false,
          type: 12,
          shape: 'circle',
        },
      },
    };

    // Crear y cargar el script
    const script = document.createElement('script');
    script.src = 'https://cdn.equalweb.com/core/5.1.13/accessibility.js';
    script.defer = true;
    script.integrity =
      'sha512-70/AbMe6C9H3r5hjsQleJEY4y5l9ykt4WYSgyZj/WjpY/ord/26LWfva163b9W+GwWkfwbP0iLT+h6KRl+LoXA==';
    script.crossOrigin = 'anonymous';
    script.setAttribute('data-cfasync', 'true');
    document.body.appendChild(script);

    return () => {
      // Limpieza opcional si el componente se desmonta
      document.body.removeChild(script);
    };
  }, []);

  return null; // No necesitas renderizar nada visual
};
