name: Bug report
description: Create a report to help us improve
labels: bug
title: "[Bug]: "
body:
  - type: textarea
    id: what-happened
    attributes:
      label: What happened?
      description: Describe the bug.
    validations:
      required: true
  - type: textarea
    id: reproduction
    attributes:
      label: Steps to reproduce
      description: How can we reproduce the behavior?
    validations:
      required: true
  - type: textarea
    id: expected
    attributes:
      label: Expected behavior
  - type: textarea
    id: environment
    attributes:
      label: Environment
      description: OS, Node version, etc.
