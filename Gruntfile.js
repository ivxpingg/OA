module.exports = function(grunt){

     'use strict';

     grunt.initConfig({
     	watch: {
     		files: [
                   'build/scss/*.scss',
                   'build/scss/base/*.scss',
                   'build/scss/helpers/*scss',
                   'build/scss/layout/*scss',
                   'build/scss/pages/*.scss',
                   'build/scss/pages/home/*.scss',
                   'build/scss/pages/workPlan/*.scss'
     		],
     		tasks: ['sass:production', 'autoprefixer']
     	},

     	//Sass 编译
     	sass: {     	 
     		development: {
                    options: {
                         style: 'expanded'    //不压缩
                    }
               },
     		production: {
     			options: {
     				style: 'expanded'//'compressed'  //压缩
     			},
     			files: {
                        'dist/css/oa.css': 'build/scss/oa.scss',
                        'dist/css/login.css': 'build/scss/pages/login.scss',
                        'dist/css/home/home.css': 'build/scss/pages/home/home.scss',
                        'dist/css/home/userCenter.css': 'build/scss/pages/home/userCenter.scss',
                        'dist/css/workPlan/workPlan.css': 'build/scss/pages/workPlan/workPlan.scss'
     			}
     		}
     	},
 

          autoprefixer: {
               dist: {
                    files: {
                        'dist/css/oa.css': 'dist/css/oa.css',
                        'dist/css/login.css': 'dist/css/login.css',
                        'dist/css/home/home.css': 'dist/css/home/home.css',
                        'dist/css/home/userCenter.css': 'dist/css/home/userCenter.css',
                        'dist/css/workPlan/workPlan.css': 'dist/css/workPlan/workPlan.css'
                    }
               }
          }



     });

     grunt.loadNpmTasks('grunt-contrib-sass');
     grunt.loadNpmTasks('grunt-contrib-watch');
     grunt.loadNpmTasks('grunt-contrib-clean');
     grunt.loadNpmTasks('grunt-autoprefixer');    //自动为 某些 CSS 属性添加针对特定厂商的前缀


     grunt.registerTask('default', ['watch']);
     grunt.registerTask('com', ['sass:production','autoprefixer']);
};