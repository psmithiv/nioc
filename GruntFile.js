module.exports = function(grunt) {
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        copy: {
            debug: {
                src: ['src/<%= pkg.name %>.js'],
                dest: 'lib/<%= pkg.name %>.js'
            }
        },

        removelogging: {
            dist: {
                src: 'src/<%= pkg.name %>.js',
                dest: 'lib/<%= pkg.name %>.js'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks("grunt-remove-logging");

    // Default task(s).
    grunt.registerTask('default', ['copy']); //, 'removelogging']);
};