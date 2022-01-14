# TODO
**Centralise config**  
I don't know why I can't import config from an ES module at run/build time but I know it's possible. Figure this out and do it so all apps don't need to declare the repository config.


**Duplicated tools**  
Release.sh is generic and should exist only in one place (app-builder, perhaps, and accepting on the path to dir as a parameter).


**Duplicated dev-server tools**  
`main.js`, `index.html` and `vite.config.js` are the same amongst all apps.


**Duplicated components**  
In addition to AppContainer (which should be moved to common-components and renamed to app-window), an AppWrapper component should be created in common-components and accept a slot, as well as id and version props so it can handle the updater (also move to common-components)  

Maybe not. Maybe move to app-builder, as it is related to the framework
