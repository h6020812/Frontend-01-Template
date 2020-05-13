# 每周总结可以写在这里
# 心得
 本周 winter老師在 Object章節中，所提到的觀念讓我受益良多，透過思考的過程，讓我受益於核心觀念的理解，也透過歷史回朔的八卦，了解到 JavaScript最初設計時遇到的痛點。期待下一周的課程，每次重學系列都讓我打開三觀。
# 回顧
判斷正負數需考慮正負零的部分

# 主題：表達式
## Grammar
### Tree vs Proority
  ======依序=====
  * Member
    * a.b
    * a[b]
    * foo `string`
    * super.b  <=  調用父
    * super['b]
    * new.target
    * new Foo()
  結構化會細說

  * New
    * new Foo
# ============
# Statement
## 綜觀：
### Grammar
  * 簡單語句
  * 組合語句
  * 聲明
### Runtime
  * Completion Record
  * Lexical Enviromemt

### Completion Record
  * [[type]]: namal, break, continue, return, or throw
  * [[value]]: Types
  * [[]]

## 簡單語句
  * ExpressionStatement
  * EmptyStatement
  * DebuggerStatement
  * ThrowStatement
  * ContinueStatement
  * BreakStatement
  * ReturnStatement

## 複合語句
  * BlockStatement -> normal
  * iteration

## 聲明

## Object
  重新解釋，意旨世間萬物、自身改變才是狀態改變

  關注：flyweight
  三要素：唯一、狀態、行為
  * Class 派
    * 歸類 (如 C++)
    * 分類 
  * prototype 派 ( Js)
  * Object API/ Grammar
    * {}.[] or Object.defineProperty
    * Object.create / Object.setPrototypeOf / Object.getPrototypeOf
    * new / class / extends
    * new / function /prototype
  * Function Object
