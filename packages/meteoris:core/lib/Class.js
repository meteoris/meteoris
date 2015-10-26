///* Simple JavaScript Inheritance
// * By John Resig http://ejohn.org/
// * MIT Licensed.
// */
//// Inspired by base2 and Prototype
//(function(){
//  var initializing = false, fnTest = /xyz/.test(function(){xyz;}) ? /\b_super\b/ : /.*/;
// 
//  // The base Class implementation (does nothing)
//  this.Class = function(){};
// 
//  // Create a new Class that inherits from this class
//  Class.extend = function(prop) {
//    var _super = this.prototype;
//   
//    // Instantiate a base class (but only create the instance,
//    // don't run the init constructor)
//    initializing = true;
//    var prototype = new this();
//    initializing = false;
//   
//    // Copy the properties over onto the new prototype
//    for (var name in prop) {
//      // Check if we're overwriting an existing function
//      prototype[name] = typeof prop[name] == "function" &&
//        typeof _super[name] == "function" && fnTest.test(prop[name]) ?
//        (function(name, fn){
//          return function() {
//            var tmp = this._super;
//           
//            // Add a new ._super() method that is the same method
//            // but on the super-class
//            this._super = _super[name];
//           
//            // The method only need to be bound temporarily, so we
//            // remove it when we're done executing
//            var ret = fn.apply(this, arguments);        
//            this._super = tmp;
//           
//            return ret;
//          };
//        })(name, prop[name]) :
//        prop[name];
//    }
//   
//    // The dummy class constructor
//    function Class() {
//      // All construction is actually done in the init method
//      if ( !initializing && this.init )
//        this.init.apply(this, arguments);
//    }
//   
//    // Populate our constructed prototype object
//    Class.prototype = prototype;
//   
//    // Enforce the constructor to be what we expect
//    Class.prototype.constructor = Class;
// 
//    // And make this class extendable
//    Class.extend = arguments.callee;
//   
//    return Class;
//  };
//})();

/*!
 * Class.js
 * Version 0.6.0
 *
 * Copyright(c) 2014 Gregory Jacobs <greg@greg-jacobs.com>
 * MIT Licensed. http://www.opensource.org/licenses/mit-license.php
 *
 * http://www.class-js.com
 */
!function(a,b){"function"==typeof define&&define.amd?define(b):"undefined"!=typeof exports?module.exports=b():a.Class=b()}(this,function(){var a=0,b={abstractMethod:function(){throw new Error("method must be implemented in subclass")},create:function(a,c){return"string"!=typeof a&&(c=a,a=""),b.extend(a,Object,c)},extend:function(a,b,c){var d=Array.prototype.slice.call(arguments);return"string"!=typeof a&&d.unshift(""),2===d.length&&d.splice(1,0,Object),a=d[0],b=d[1],c=d[2],e.build(a,b,c)},override:function(a,b){if(b){var c=a.prototype;f.assign(c,b),f.isIe()&&b.hasOwnProperty("toString")&&(c.toString=b.toString)}},isInstanceOf:function(a,c){if("function"!=typeof c)throw new Error("jsClass argument of isInstanceOf method expected a Function (constructor function) for a JavaScript class");return f.isObject(a)?a instanceof c?!0:b.hasMixin(a.constructor,c)?!0:!1:!1},isSubclassOf:function(a,b){if("function"!=typeof a||"function"!=typeof b)return!1;if(a===b)return!0;for(var c=a,d=c.prototype;c=(d=c.__super__)&&d.constructor;)if(d.constructor===b)return!0;return!1},hasMixin:function(c,d){var e=d.__Class_classId;e||(e=d.__Class_classId=++a);var f=c.__Class_hasMixinCache;if(f||(f=c.__Class_hasMixinCache={}),e in f)return f[e];var g=c.mixins,h=c.superclass||c.__super__;if(g)for(var i=0,j=g.length;j>i;i++)if(g[i]===d)return f[e]=!0;if(h&&h.constructor&&h.constructor!==Object){var k=b.hasMixin(h.constructor,d);return f[e]=k}return f[e]=!1}},c=/xyz/.test(function(){})?/\b_super\b/:/.*/,d=function(a){for(var b in a)this[b]=a[b]},e={build:function(a,c,d){var g=!!d.abstractClass,h=d.statics,i=d.inheritedStatics,j=d.mixins;delete d.statics,delete d.inheritedStatics,delete d.mixins,e.wrapSuperclassCallingMethods(c,d);var k=e.createConstructor(c,d),l=function(){var a=this.constructor.prototype;if(a.hasOwnProperty("abstractClass")&&a.abstractClass===!0){var b=this.constructor.displayName;throw new Error("Error: Cannot instantiate abstract class"+(b?" '"+b+"'":""))}return k.apply(this,arguments)};a&&(l.displayName=a),e.createPrototypeChain(c,l),e.attachCommonSubclassStatics(l),e.attachCommonSubclassInstanceMethods(c,l),b.override(l,d),g||e.checkAbstractMethodsImplemented(l),(i||c.__Class_inheritedStatics)&&(i=f.assign({},c.__Class_inheritedStatics,i),f.assign(l,i),l.__Class_inheritedStatics=i),h&&f.assign(l,h),j&&e.applyMixins(l,j);var m=l.onClassCreate||l.onClassCreated||l.onClassExtended;return m&&m.call(l,l),l},createConstructor:function(a,b){var c;return b.constructor!==Object?(c=b.constructor,delete b.constructor):c=a===Object?function(){}:function(){return a.apply(this,arguments)},c},createPrototypeChain:function(a,b){var c=a.prototype,d=b.prototype,e=function(){};e.prototype=c,d=b.prototype=new e,d.constructor=b,b.superclass=b.__super__=c,b.__Class=!0},checkAbstractMethodsImplemented:function(a){var c=a.prototype;for(var d in c)if(c[d]===b.abstractMethod){var e=c.constructor.displayName;throw new Error(c.hasOwnProperty(d)?"The class "+(e?"'"+e+"'":"being created")+" has abstract method '"+d+"', but is not declared with 'abstractClass: true'":"The concrete subclass "+(e?"'"+e+"'":"being created")+" must implement abstract method: '"+d+"', or be declared abstract as well (using 'abstractClass: true')")}},wrapSuperclassCallingMethods:function(a,b){var d=a.prototype;for(var f in b)"constructor"!==f&&b.hasOwnProperty(f)&&"function"==typeof b[f]&&"function"==typeof d[f]&&!b[f].hasOwnProperty("__Class")&&c.test(b[f])&&(b[f]=e.createSuperclassCallingMethod(a,f,b[f]));b.hasOwnProperty("constructor")&&"function"==typeof b.constructor&&"function"==typeof d.constructor&&c.test(b.constructor)&&(b.constructor=e.createSuperclassCallingMethod(a,"constructor",b.constructor))},attachCommonSubclassStatics:function(a){a.override=function(c){b.override(a,c)},a.extend=function(c,d){return 1===arguments.length&&(d=c,c=""),b.extend(c,a,d)},a.hasMixin=function(c){return b.hasMixin(a,c)}},attachCommonSubclassInstanceMethods:function(a,c){var e=c.prototype;e.superclass=e.supr=function(){return a.prototype},e.override=d,e.hasMixin=function(a){return b.hasMixin(this.constructor,a)}},createSuperclassCallingMethod:function(a,b,c){var d=a.prototype;return function(){var a=this._super,e=this;this._super=function(a){return d[b].apply(e,a||[])};var f=c.apply(this,arguments);return this._super=a,f}},applyMixins:function(a,b){for(var c=a.prototype,d=b.length-1;d>=0;d--){var e=b[d].prototype;for(var f in e)"undefined"==typeof c[f]&&(c[f]=e[f])}a.mixins=b}},f=b.Util={assign:function(a){for(var b=Array.prototype.slice.call(arguments,1),c=0,d=b.length;d>c;c++){var e=b[c];for(var f in e)e.hasOwnProperty(f)&&(a[f]=e[f])}return a},isObject:function(a){return!!a&&"[object Object]"===Object.prototype.toString.call(a)},isIe:function(){var a=!1;if("undefined"!=typeof window&&window.navigator&&window.navigator.userAgent){var b=window.navigator.userAgent.toLowerCase();a=/msie/.test(b)&&!/opera/.test(b)}return function(){return a}}()};return b});