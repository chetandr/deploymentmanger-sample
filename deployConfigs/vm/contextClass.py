class Context:
  env = {}
  properties = {}
  def __init__(self, env, properties):
    self.properties = properties
    self.env = env
  def getProperties(self):
    return self.properties