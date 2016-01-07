/// <vs BeforeBuild='build, test' />
module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        watch: {
          files: ['./lib/**/*', './bin/**/*', './spec/**/*'],
          tasks: ['jshint:all', 'jasmine_nodejs:all'],
        },

        jshint: {
            all: ['./bin/*.js', './lib/*.js'],
            options: {
                curly: true,
                eqeqeq: true,
                quotmark: 'single',
                shadow: 'outer',
                undef: true,
                unused: true,
                globalstrict: true,
                globals: {
                   module: false,
                   process: false,
                   require: false,
                   console: false
                }
            }
        },

        jasmine_nodejs: {
            options: {
                specNameSuffix: ".js", // also accepts an array 
                helperNameSuffix: ".js",
                useHelpers: true,
                stopOnFailure: false,
                reporters: {
                    console: {
                        colors: true,
                        cleanStack: 1,       // (0|false)|(1|true)|2|3 
                        verbosity: 4,        // (0|false)|1|2|3|(4|true) 
                        listStyle: "indent", // "flat"|"indent" 
                        activity: false
                    }, 
                },
            },
            all: {
                specs: ['./spec/**/describe_*.js'],
                healpers: ['./spec/helpers/**']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-jasmine-nodejs');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('test', ['jshint:all', 'jasmine_nodejs:all']);
    grunt.registerTask('test-continuous', ['watch']);
};
