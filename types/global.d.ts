// 接口响应体类型
interface ResponseData<T> {
  request: any;
  response: any;
  data: T;
}

// 接口请求返回的通用结果类型
interface ResultData<T = any> {
  code: number;
  data: T;
  message: string;
}

// 分页数据类型
interface PaginationData<T = any> {
  // 数据列表
  list: T[];
  // 分页信息
  pageNum: number;      // 当前页码
  pageSize: number;     // 每页大小
  totalCount: number;   // 总记录数
  totalPages: number;   // 总页数
  // 导航信息
  hasPreviousPage: boolean;  // 是否有前一页
  hasNextPage: boolean;      // 是否有下一页
  isFirstPage: boolean;      // 是否为第一页
  isLastPage: boolean;       // 是否为最后一页
}
