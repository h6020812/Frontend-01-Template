# 汇编通识语言

* BNF 產生式(重點，語言設計通則)
````
<LogicalExpression> = (<AdditiveExpression> |
<LogicalExpression> "||" <AdditiveExpression> |
<LogicalExpression> "&&" <AdditiveExpression>)
````    
* 計算機怎麼知道，(透過語法分析)
* js 符合二型

# ============================
## 圖靈完備性
  * 命令式---圖靈機
    * goto
    * if && while
  * 聲明式---lambda
    * 遞迴
# ======================
* 動態語言
  * 產品運行時
  * Runtime
* 靜態語言
  * 產品開發時
  * Compiletime

總結：越少bug的話，要偏向於靜態

# =======================
## 類型系統
  * 動態 vs 靜態
  * 強類型 vs 弱類型(開發爽，除錯不爽)
  * 複合類型
    * 結構體
    * 函數簽名
  * 子類型
    * 逆變
    * 協變

# ========================
## 一般命令式編成語言
  * Atom
  * Expression
  * Statement
  * Structure
  * Program
  
# =====================
## JavaScript 詞法、類型
### InputElement
  * WhiteSpace
    * <TAB>
    * <VT>
    * <FF>
    * <SP> <= 常用
    * <NBSP> <= 排版可以防止分詞
    * <ZWNBSP> <= Zero width no space   
    * <USP> <= unicode
  * LineTerminator
  * Comment
  * Token
    * Punctuator
    * Keywords
    * Identifier
      * 變量名
      * 屬姓名       
    * Literal      
      * Number
      * String

  
