
const getMenuFrontEnd = (role = 'USER_ROLE') => {

    const menu = [
        {
          titulo: 'Dashboard',
          icono: 'mdi mdi-gauge',
          submenu: [
            { titulo: 'Crear reporte', url: '/' },
            //{ titulo: 'Gráficas', url: 'grafica1' },
            { titulo: 'reporte', url: 'rxjs' },
            { titulo: 'Pausas', url: 'promesas' },
            //{ titulo: 'ProgressBar', url: 'progress' },
          ]
        },
    
        {
          titulo: 'Herramientas',
          icono: 'mdi mdi-folder-lock-open',
          submenu: [
            
          ]
        },
      ];

    if ( role === 'ADMIN_ROLE' ) {
        menu[1].submenu.unshift({ titulo: 'Usuarios', url: 'usuarios' },
                                { titulo: 'Departamentos', url: 'departamentos' },
                                { titulo: 'Agentes', url: 'agentes' },
                                { titulo: 'Gráficas', url: 'grafica1' },)
    }
    if ( role === 'ANALITIC_USER' ) {
      menu[1].submenu.unshift({ titulo: 'Gráficas', url: 'grafica1' },)
  }

    return menu;
}

module.exports = {
    getMenuFrontEnd
}
