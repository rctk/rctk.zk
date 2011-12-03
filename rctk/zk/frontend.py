import os

import rctk.core

from rctk.resourceregistry import getResourceRegistry

from rctk.frontend import Frontend as Base
class ZKFrontend(Base):
    name = "ZKUI"

    @classmethod
    def workingdir(cls):
        return os.path.dirname(__file__)

    @classmethod
    def index_html(cls):
        """ return the main index.html template """
        import rctk.zk.resources
        path = os.path.join(cls.workingdir(), 'main.html')
        tpl = open(path, "r").read()
        header = getResourceRegistry().header()
        return tpl.replace('<!-- rctk-header -->', header)

