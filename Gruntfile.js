module.exports = function(grunt){

     'use strict';

     grunt.initConfig({
     	watch: {
     		files: [
             
     		],
     		tasks: ["sass:production"]
     	},

     	//Sass 编译
     	sass: {     	 
     		development: {},
     		production: {
     			options: {
     				style: 'compressed'
     			},
     			files: [
                    {}
     			]
     		}
     	},


     });

     grunt.LoadNpmTasks('grunt-contrib-sass');
     grunt.LoadNpmTasks('grunt-contrib-watch');
     grunt.LoadNpmTasks('grunt-contrib-clean');


     grunt.registerTask('default',['watch']);
};