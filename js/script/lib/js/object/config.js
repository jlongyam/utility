(function(path_to){
  script.map = {
    'object.js': path_to+'object.js',
    'chain/forEach.js': path_to+'chain/forEach.js',
    'chain/hasProperty.js': path_to+'chain/hasProperty.js',
    'chain/addProperty.js': path_to+'chain/addProperty.js',
    'chain/renameProperty.js': path_to+'chain/renameProperty.js',
    'chain/updateProperty.js': path_to+'chain/updateProperty.js',
    'chain/removeProperty.js': path_to+'chain/removeProperty.js',
    'chain/addEventListener.js': path_to+'chain/addEventListener.js',
    'chain/getEventListener.js': path_to+'chain/getEventListener.js',
    'chain/removeEventListener.js': path_to+'chain/removeEventListener.js',
    'type.js': path_to+'type.js',
    'keys.js': path_to+'keys.js',
    'createEvents.js': path_to+'createEvents.js'
  };
  script({ require: [
    'object.js',
    'chain/forEach.js',
    'chain/hasProperty.js',
    'chain/addProperty.js',
    'chain/renameProperty.js',
    'chain/updateProperty.js',
    'chain/removeProperty.js',
    'chain/addEventListener.js',
    'chain/getEventListener.js',
    'chain/removeEventListener.js',
    'type.js',
    'keys.js',
    'createEvents.js'
  ]})
}(script.path.dir+'lib/js/object/'))
