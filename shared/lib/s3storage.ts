import { Readable } from 'stream'
import { AWSError } from 'aws-sdk'
import * as aws from 'aws-sdk'
import {
	CopyObjectOutput,
	DeleteObjectOutput,
	GetObjectOutput,
	ManagedUpload,
} from 'aws-sdk/clients/s3'

import { PromiseResult } from 'aws-sdk/lib/request'
import mime from 'mime-types'

export interface S3UploadOptions {
	bucket: string
	accessKeyId: string
	secretAccessKey: string
	region: string
}

export interface FileOptions {
	contentType?: string
	path?: string
	id?: number | string
	prefix?: string
	convert_cdn_url?: boolean
}

export interface IStorageService {
	// upload(sourceStream: Readable | Buffer, filename: string, options?: any): Promise<IUploadResult>

	download(keyName: string, options?: FileOptions): Promise<any>

	delete(filename: string, options?: FileOptions): Promise<any>

	updateMeta(): Promise<any>
}

export interface IUploadResult {
	url: string
	path: string
}

export class S3StorageService implements IStorageService {
	private readonly options: S3UploadOptions
	private readonly bucket: string
	private readonly s3Client: aws.S3

	constructor(options: S3UploadOptions) {
		this.options = options
		this.bucket = options.bucket
		this.s3Client = this.initClient()
	}

	private initClient() {
		return new aws.S3({
			accessKeyId: this.options.accessKeyId,
			secretAccessKey: this.options.secretAccessKey,
			region: this.options.region,
		})
	}

	// //filename의 thumbnail이 있는지 확인
	// const thumbnailFilename = filename.split('.')[0] + '_thumbnail.' + filename.split('.')[1]
	// const thumbnailParams = {
	// 	Bucket: this.bucket,
	// 	Key: thumbnailFilename,
	// }
	//
	// //S3에 thumbnail 파일이 있으면 삭제
	// const exists = await this.s3Client.headObject(thumbnailParams).promise()
	// if (exists) {
	// 	await this.s3Client.deleteObject(thumbnailParams).promise()
	// }
	async delete(
		filename: string,
		options?: FileOptions,
	): Promise<PromiseResult<DeleteObjectOutput, AWSError>> {
		const keyName = this.getPath(filename, options)
		return this.s3Client
			.deleteObject({
				Bucket: this.bucket,
				Key: keyName,
			})
			.promise()
	}

	async cp(
		source: string,
		filename: string,
		options?: FileOptions,
	): Promise<PromiseResult<CopyObjectOutput, AWSError>> {
		const keyName = this.getPath(filename, options)
		return this.s3Client
			.copyObject({
				CopySource: source,
				Bucket: this.bucket,
				Key: keyName, //destination object.
			})
			.promise()
	}

	download(
		filename: string,
		options?: FileOptions,
	): Promise<PromiseResult<GetObjectOutput, AWSError>> {
		const keyName = this.getPath(filename, options)
		return this.s3Client
			.getObject({
				Key: keyName,
				Bucket: this.bucket,
			})
			.promise()
	}

	updateMeta(): Promise<any> {
		return Promise.resolve(undefined)
	}

	getPath(kenName: string, options?: FileOptions): string {
		return options?.path ? `${options.path}/${kenName}` : kenName
	}

	getContentType(filename: string): string {
		const contentType = mime.lookup(filename)

		if (!contentType) {
			return 'application/octet-stream'
		} else {
			return contentType
		}
	}

	/**
	 * Uploads a file to S3
	 * @param sourceStream
	 * @param filename
	 * @param options - options 값 아직 뭐가 들어갈지 몰라서  any로 해놓음
	 */
	// async upload(
	//     sourceStream: Readable | Buffer,
	//     filename: string,
	//     options?: FileOptions,
	// ): Promise<IUploadResult> {
	//     //options.path가 있으면 path를 붙여서 업로드
	//     const keyName = this.getPath(filename, options)
	//     const contentType = options.contentType
	//         ? options.contentType
	//         : this.getContentType(filename)
	//     const objectParams: aws.S3.Types.PutObjectRequest = {
	//         Bucket: this.bucket,
	//         Key: keyName,
	//         Body: sourceStream,
	//         //ContentType: 'application/octet-stream',
	//         ContentType: contentType,
	//         ACL: 'private', //나중에 ACL 정책 픽스되면 수정예정
	//     }

	//     const results: ManagedUpload.SendData = await this.s3Client.upload(objectParams).promise()

	//     let url = results.Location
	//     console.log('url:', url)
	//     console.log('options.convert_cdn_url', options.convert_cdn_url)
	//     if (options.convert_cdn_url) {
	//         url = url.replace(
	//             this.bucket + '.s3.ap-northeast-2.amazonaws.com',
	//             'static.v2.solvook.com',
	//         )
	//     }

	//     return Promise.resolve({
	//         url: url,
	//         path: results.Key,
	//     })
	// }
}
