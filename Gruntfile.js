module.exports = function(grunt) {

    'use strict';

    // Load all grunt tasks
    // --------------------------
    require('load-grunt-tasks')(grunt);


    // Init Config
    // --------------------------
    var appConfig = {

        // Dirs
        src: {
            root: 'src',
            js:   'src/js',
            css:  'src/css'
        },
        dist: {
            root: 'dist',
            js:   'dist/js',
            css:  'dist/css'
        },

        // Metadata
        pkg: grunt.file.readJSON('package.json'),
        banner:
        "/*" +
        " * -------------------------------------------------------\n" +
        " * Project: <%= pkg.title %>\n" +
        " * Version: <%= pkg.version %>\n" +
        " * Author:  <%= pkg.author.name %> (<%= pkg.author.email %>)\n" +
        " *\n" +
        " * Copyright (c) <%= grunt.template.today(\"yyyy\") %> <%= pkg.title %>\n" +
        " * -------------------------------------------------------\n" +
        " */\n",

        // Start Server
        connect: {
            server: {
                options: {
                    port: 9000,
                    base: '.',
                    hostname: 'localhost',
                    livereload: true,
                    open: true
                }
            }
        },

        // Watch Task
        watch: {
            options: {
                livereload: true
            },
            js: {
                files: '<%= jshint.all %>',
                tasks: 'jshint'
            },
            html: {
                files: '<%= src.root %>/*.html'
            }
        },

        // Clean
        clean : ['<%= dist.root %>'],

        // CSS Minify
        cssmin: {
            dist: {
                files: {
                    '<%= dist.css %>/style.min.css': [ '<%= src.css %>/normalize.css', '<%= src.css %>/main.css' ]
                }
            }
        },

        // JS Linting
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            all: [
                'Gruntfile.js',
                '<%= src.js %>/main.js'
            ]
        },

        // JS Concat and Minify
        uglify: {
            options: {
                mangle: false,
                banner: '<%= banner %>'
            },
            dist: {
                files: {
                    '<%= dist.js %>/main.min.js': [ '<%= src.js %>/main.js' ]
                }
            }
        }

    };

    grunt.initConfig(appConfig);


    // Register tasks
    // --------------------------
    grunt.registerTask( 'default', [ 'connect', 'watch' ]);
    grunt.registerTask( 'build',   [ 'jshint' ]);
    grunt.registerTask( 'deploy',  [ 'clean', 'uglify', 'cssmin' ]);

};
