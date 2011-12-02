from setuptools import setup, find_packages
import os

version = '1.0'

setup(name='rctk.zk',
      version=version,
      description="ZK frontend for RCTK",
      long_description=open("README.txt").read() + "\n" +
                       open(os.path.join("docs", "HISTORY.txt")).read(),
      # Get more strings from http://pypi.python.org/pypi?%3Aaction=list_classifiers
      classifiers=[
        "Programming Language :: Python",
        ],
      keywords='',
      author='Dimitri Christodoulou',
      author_email='dimitri@rctk.org',
      url='http://rctk.org/',
      license='BSD',
      packages=find_packages(exclude=['ez_setup']),
      namespace_packages=['rctk'],
      include_package_data=True,
      zip_safe=False,
      install_requires=[
          'setuptools',
          'rctk',
          'rctk.core'
      ],
      entry_points="""
      # -*- Entry points: -*-
      """,
      )
