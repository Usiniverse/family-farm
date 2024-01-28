import ExcelJS from 'exceljs'
import { orderRepository, userRepository } from '../../src/repositorys'
import { Request, Response } from 'express'

export const excelResponse = async (res: Response, data: any, filename: string) => {
	res.setHeader(
		'Content-Type',
		'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
	)
	res.setHeader('Content-Disposition', `attachment; filename=${filename}`)
	await data.xlsx.write(res)
	res.end()
}

// export const generateOrderExcel = async (date: Date, res: Response) => {
// 	// 1. 주문서에 입력할 내용을 DB에서 뽑아오기
// 	// 2. 반복문 실행하며 헤더 입력
// 	// 3. 반복문 실행하며 row 입력
// 	// 4. 파일 리턴

// 	const excel = new ExcelJS.Workbook()
// 	const excelSheet = excel.addWorksheet('24년 택배')
// 	excelSheet.columns = [
// 		{ header: '출고일', key: '출고일', width: 10 },
// 		{ header: '', key: '', width: 10 },
// 		{ header: '', key: '', width: 10 },
// 		{ header: '의뢰인', key: '의뢰인', width: 10 },
// 		{ header: 'A01-받는고객', key: 'A01-받는고객', width: 10 },
// 		{ header: 'A06-받는고객전체주소', key: 'A06-받는고객전체주소', width: 10 },
// 		{ header: '고객전화번호', key: '고객전화번호', width: 10 },
// 		{ header: '사과단위', key: '사과단위', width: 10 },
// 		{ header: '품명', key: '품명', width: 10 },
// 		{ header: '택배종류', key: '택배종류', width: 10 },
// 		{ header: '결제방법', key: '결제방법', width: 10 },
// 		{ header: '운임', key: '운임', width: 10 },
// 		{ header: '금액', key: '금액', width: 10 },
// 		{ header: '입금인', key: '입금인', width: 10 },
// 		{ header: '입금일', key: '입금일', width: 10 },
// 		{ header: '확인(은행)', key: '확인(은행)', width: 10 },
// 		{ header: '택배운임', key: '택배운임', width: 10 },
// 		{ header: '3kg', key: '3kg', width: 10 },
// 		{ header: '5kg', key: '5kg', width: 10 },
// 		{ header: '10kg', key: '10kg', width: 10 },
// 		{ header: '메모', key: '메모', width: 10 },
// 		{ header: '메모', key: '메모', width: 10 },
// 		{ header: '000-선택안함', key: '000-선택안함', width: 10 },
// 		{ header: '000-선택안함', key: '000-선택안함', width: 10 },
// 		{ header: '000-선택안함', key: '000-선택안함', width: 10 },
// 		{ header: '000-선택안함', key: '000-선택안함', width: 10 },
// 		{ header: '000-선택안함', key: '000-선택안함', width: 10 },
// 		{ header: '000-선택안함', key: '000-선택안함', width: 10 },
// 		{ header: 'M02-품명02', key: 'M02-품명02', width: 10 },
// 		{ header: 'M03-품명03', key: 'M03-품명03', width: 10 },
// 		{ header: 'E01-박스크기', key: 'E01-박스크기', width: 10 },
// 		{ header: 'H01-원송장번호', key: 'H01-원송장번호', width: 10 },
// 		{ header: '주문수량', key: '주문수량', width: 10 },
// 	]

// 	const orderList = await orderRepository.getOrdersForDate(date)

// 	for (let i = 0; i < orderList.length; i++) {
// 		const orderUser = await userRepository.getUserById(orderList[i].user_id)
// 		excelSheet.addRow({
// 			출고일: orderList[i].created_at,
// 			의뢰인: orderUser.name,
// 			'A01-받는고객': orderUser.name,
// 			'A06-받는고객전체주소': orderList[i].target_address,
// 			// 고객 연락처 추가 필요
// 		})
// 	}

// 	return excelResponse(res, excel, `엑셀 시트 뽑아보기`)
// }
