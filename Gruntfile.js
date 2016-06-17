module.exports = function(grunt){

     'use strict';

     var banner = '/* \n *长潮OA \n*/\n';
     
     grunt.initConfig({      
     	watch: {
     		files: [
                   'build/**/*.scss',
                   'build/*.js',
                   'build/**/*.js',
                   // 'build/scss/base/*.scss',
                   // 'build/scss/helpers/*scss',
                   // 'build/scss/layout/*scss',
                   // 'build/scss/pages/*.scss',
                   // 'build/scss/pages/home/*.scss',
                   // 'build/scss/pages/workPlan/*.scss',
                   // 'build/scss/pages/publicNotion/*.scss',
                   // 'build/scss/pages/addressList/*.scss',
                   // 'build/scss/pages/attendanceManage/*.scss',
                   // 'build/scss/pages/process/*.scss',
                   // 'build/scss/pages/email/*.scss'
     		],
     		tasks: ['sass:production', 'autoprefixer', 'build']
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
                        'dist/css/workPlan/workPlan.css': 'build/scss/pages/workPlan/workPlan.scss',
                        'dist/css/publicNotion/notion.css': 'build/scss/pages/publicNotion/notion.scss',
                        'dist/css/addressList/addressList.css': 'build/scss/pages/addressList/addressList.scss',
                        'dist/css/attendanceManage/attendance.css': 'build/scss/pages/attendanceManage/attendance.scss',
                        'dist/css/process/process.css': 'build/scss/pages/process/process.scss',
                        'dist/css/email/emails.css': 'build/scss/pages/email/emails.scss',
     			}
     		}
     	},
      
      //合并JS
      concat: {
          options: {
            banner: banner,
            separator: ';',
            sourceMap: true
          },
          app: {
            src: [                
                'build/js/utils/var.js',     //代码前置
                'build/js/utils/extend.js',  //代码前置
                'build/js/utils/*.js',       // ..
                'build/js/**/*.js',          //代码合并顺序随意，默认会过滤前置或后置代码块
                'build/js/oa.js',            //代码后置
            ],
            dest: 'dist/js/app.js'
          }
          
      },

      autoprefixer: {
               dist: {
                    files: {
                        'dist/css/oa.css': 'dist/css/oa.css',
                        'dist/css/login.css': 'dist/css/login.css',
                        'dist/css/home/home.css': 'dist/css/home/home.css',
                        'dist/css/home/userCenter.css': 'dist/css/home/userCenter.css',
                        'dist/css/workPlan/workPlan.css': 'dist/css/workPlan/workPlan.css',
                        'dist/css/addressList/addressList.css': 'dist/css/addressList/addressList.css',
                        'dist/css/addressList/addressList.css': 'dist/css/addressList/addressList.css',
                        'dist/css/attendanceManage/attendance.css': 'dist/css/attendanceManage/attendance.css',
                        'dist/css/process/process.css': 'dist/css/process/process.css',
                        'dist/css/email/emails.css': 'dist/css/email/emails.css'
                    }
               }
          }


     });

     grunt.loadNpmTasks('grunt-contrib-sass');
     grunt.loadNpmTasks('grunt-contrib-watch');
     grunt.loadNpmTasks('grunt-contrib-clean');
     grunt.loadNpmTasks('grunt-contrib-concat');
     grunt.loadNpmTasks('grunt-autoprefixer');    //自动为 某些 CSS 属性添加针对特定厂商的前缀


     grunt.registerTask('default', ['watch']);
     grunt.registerTask('build', ['concat']);
     grunt.registerTask('com', ['sass:production','autoprefixer']);
};