module.exports = function(grunt) {
  var buildPlatforms = parseBuildPlatforms(grunt.option('platforms'));

  grunt.initConfig({
    nodewebkit: {
      options: {
        version: '0.11.6',
        appVersion: '0.0.1',
        buildType: 'versioned',
        build_dir: './build',
        macIcns: './icons/whatsapp.icns',
        macZip: true,
        winIco: './icons/whatsapp.ico',
        mac: buildPlatforms.mac,
        win: buildPlatforms.win,
        linux32: buildPlatforms.linux32,
        linux64: buildPlatforms.linux64
      },
      src: ['./index.html','./package.json', './README.md' ]
    }
  });

  grunt.loadNpmTasks('grunt-node-webkit-builder');

  grunt.registerTask('default', []);
  grunt.registerTask('nodewkbuild', ['nodewebkit']);
  grunt.registerTask('build', ['nodewkbuild']);

};

var parseBuildPlatforms = function(argumentPlatform) {
  // this will make it build no platform when the platform option is specified
  // without a value which makes argumentPlatform into a boolean
  var inputPlatforms = argumentPlatform || process.platform + ";" + process.arch;

  // Do some scrubbing to make it easier to match in the regexes bellow
  inputPlatforms = inputPlatforms.replace("darwin", "mac");
  inputPlatforms = inputPlatforms.replace(/;ia|;x|;arm/, "");

  var buildAll = /^all$/.test(inputPlatforms);

  var buildPlatforms = {
    mac: /mac/.test(inputPlatforms) || buildAll,
    win: /win/.test(inputPlatforms) || buildAll,
    linux32: /linux32/.test(inputPlatforms) || buildAll,
    linux64: /linux64/.test(inputPlatforms) || buildAll
  };

  return buildPlatforms;
}
