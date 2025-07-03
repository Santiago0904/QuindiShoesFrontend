import React, { useEffect } from 'react';

export const Accesibilidad = () => {
  useEffect(() => {
    // Configuración del widget de accesibilidad
    window.interdeal = {
      sitekey: '1f76ceb33566c3c6cd0a939482ddb145',
      Position: 'left',
      domains: {
        js: 'https://cdn.equalweb.com/',
        acc: 'https://access.equalweb.com/',
      },
      Menulang: 'EN',
      draggable: false,
      btnStyle: {
        vPosition: ['50%', '80%'],
        scale: ['0.5', '0.5'],
        color: {
          main: '#cc1ec1',
          second: '#ffffff',
        },
        icon: {
          outline: false,
          type: 11,
          shape: 'semicircle',
        },
      },
    };

    // Cargar el script de EqualWeb
    const script = document.createElement('script');
    script.src = 'https://cdn.equalweb.com/core/5.1.13/accessibility.js';
    script.defer = true;
    script.integrity =
      'sha512-70/AbMe6C9H3r5hjsQleJEY4y5l9ykt4WYSgyZj/WjpY/ord/26LWfva163b9W+GwWkfwbP0iLT+h6KRl+LoXA==';
    script.crossOrigin = 'anonymous';
    script.setAttribute('data-cfasync', 'true');

    document.body.appendChild(script);

    return () => {
      // Limpieza cuando se desmonte el componente
      document.body.removeChild(script);
    };
  }, []);

  return null; // No renderiza ningún componente visual
};
