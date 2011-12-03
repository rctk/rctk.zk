from rctk.resourceregistry import addResource, JSFileResource, CSSFileResource

addResource(JSFileResource('core/onion.js'))
addResource(JSFileResource('core/core.js'))
addResource(CSSFileResource('layouts/resources/grid.css'))
addResource(CSSFileResource('layouts/resources/tab.css'))
addResource(CSSFileResource('widgets/resources/grid.css'))

import rctk.zk.layouts.resources
import rctk.zk.widgets.resources

