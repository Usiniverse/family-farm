# 주문 과정

> 1. 장바구니 생성
>    <br/>장바구니에 상품을 담는다.

-   user_id: number
-   product_id: number
-   quantity: number
-   product_image?: string
-   price: number

> 2. 주문 상품 생성
>    <br/>장바구니에 담긴 정보를 바탕으로 주문 상품을 배열로 생성한다.

-   order_id?: number
-   product_id: number
-   quantity: number
-   order_price: number

> 3.  주문 생성
>     <br/>order_item_id를 담아 주문을 생성한다.

-   user_id: number
-   target_address: string
-   product_id: number
-   target_phone_number: string

> 4.  주문 상품에 order_id 업데이트
>     <br/>order_items에 order_id를 업데이트한다.
