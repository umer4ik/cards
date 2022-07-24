const SOLID = 'SOLID'.split('')

const OOP = ['Abstraction', 'Inheritance', 'Encapsulation', 'Polymorphism']

const CP = ['Factory method', 'Abstract factory', 'Builder', 'Prototype', 'Singleton']

const SP = ['Adapter', 'Bridge', 'Composite', 'Decorator', 'Facade', 'Flyweight', 'Proxy']

const BP = ['Chain of Responsibility', 'Command', 'Iterator', 'Mediator', 'Memento', 'Observer', 'State', 'Strategy', 'Template Method', 'Visitor']

export const TOPICS_MAP = new Map([
  ['Creational patterns', CP],
  ['Structural patterns', SP],
  ['Behavioral patterns', BP],
  ['SOLID', SOLID],
  ['OOP', OOP]
])
export const TOPICS_ORDER_SET = new Set(['Creational patterns', 'Structural patterns', 'Behavioral patterns', 'SOLID', 'OOP'])
