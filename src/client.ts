import * as z from "./index";
import {PickUnion} from "./utils";

type ClientRequestAttributes = "method" | "path" | "query" | "headers" | "body"
type ClientResponseAttributes = "status" | "headers" | "body"
type ClientRequest<T extends z.HttpSchema> = PickUnion<z.output<T>, ClientRequestAttributes>
type ClientRequestResponses<T extends z.HttpSchema> = PickUnion<z.output<T>, ClientRequestAttributes | "responses">
type ClientMapper<T extends z.HttpSchema, R extends ClientRequest<T>> = NonNullable<{ method: R['method'], path: R['path'], query: R['query'], headers: R['headers'], body?: R['body'] }>
type ClientMatch<T extends z.HttpSchema, R extends ClientRequest<T>> = Pick<Extract<ClientRequestResponses<T>, ClientMapper<T, R>>['responses'], ClientResponseAttributes>

export type Client<T extends z.HttpSchema> = <R extends ClientRequest<T>>(req: R) => Promise<ClientMatch<T, R>>;
