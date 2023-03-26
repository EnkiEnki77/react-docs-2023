//It makes sense to not define all your components in your root component file, but to give every componnet their own file
//and import/export them. This makes them much more reusable. 

//There are two kinds of exports, default and named exports. Each file should only have one default export this is the
//main component of the file, but it can have as many named exports as youd like.

//You can either put the export keywords in front of the definitions of your components, or at the end of your files

export default function DefaultExport(){
    return 
}

export  function NamedExport(){
    return 
}

function DefaultExport2(){
    return 
}

function NamedExport2(){
    return 
}

// export default DefaultExport2

export {NamedExport, DefaultExport}

//To import default exports you import them with any name youd like to represent them as from the file theyre exported
//from 

import DExport from './script.js'

//To import named exports you have to destructure them from the file youre exporting from, and import name must 
//be the same as the export name. 

import {NamedExport, DefaultExport} from './script.js'

