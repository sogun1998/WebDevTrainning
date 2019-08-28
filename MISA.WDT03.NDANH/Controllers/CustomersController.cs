using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using MISA.BL;
using MISA.DL;
using MISA.Entities;


namespace MISA.WDT03.NDANH
{
    public class CustomersController : ApiController
    {
        private CustomerDL _cusDL = new CustomerDL();
        private CustomerBL _cusBL = new CustomerBL();
        /* Hàm lấy dữ liệu
         * Người tạo : NDAnh
         */
        [Route("customer/{pageIndex}/{pageSize}")]
        [HttpGet]
        public AjaxResult getDataWithPaging([FromUri]int pageIndex, int pageSize)
        {
            var _ajaxResult = new AjaxResult();
            try
            {
                _ajaxResult.Data = _cusBL.GetPagingData(pageIndex, pageSize);
                _ajaxResult.TotalRecord = _cusBL.GetTotalRecord();
            }
            catch (Exception ex)
            {
                _ajaxResult.Success = false;
                _ajaxResult.Message = "Lỗi getData";
                _ajaxResult.Data = ex;
            }
            return _ajaxResult;

        }

        /*
         * Hàm lưu dữ liệu vào database
         */
        [Route("customer")]
        [HttpPost]
        public AjaxResult SaveCustomer([FromBody]Customer _customer)
        {
            var _ajaxResult = new AjaxResult();
            try
            {
                _cusDL.AddCustomer(_customer);
            }
            catch (Exception ex)
            {
                _ajaxResult.Success = false;
                _ajaxResult.Message = "Lỗi Lưu data";
                _ajaxResult.Data = ex;
            }
            return _ajaxResult;

        }
        /// <summary>
        /// Hàm sửa Khách hàng
        /// Người tạo: NDAnh
        /// </summary>
        /// <param name="_customer"></param>
        /// <returns></returns>
        [Route("customer")]
        [HttpPut]
        public AjaxResult Put([FromBody]Customer _customer)
        {
            var _ajaxResult = new AjaxResult();
            try
            {
                _cusDL.EditCus(_customer);
            }
            catch (Exception ex)
            {
                _ajaxResult.Success = false;
                _ajaxResult.Message = "Lỗi put dữ liếu";
                _ajaxResult.Data = ex;
            }
            return _ajaxResult;
        }
        /// <summary>
        /// Hàm xóa Khách hàng
        /// </summary>
        /// <param name="_cus"></param>
        /// <returns></returns>
        [Route("customer")]
        [HttpDelete]
        public AjaxResult Delete([FromBody]List<Guid> _cus)
        {
            var _ajaxResult = new AjaxResult();
            try
            {
                _cusDL.DeleteCustomer(_cus);
            }
            catch (Exception ex)
            {
                _ajaxResult.Success = false;
                _ajaxResult.Message = "Lỗi xóa";
                _ajaxResult.Data = ex;
            }
            return _ajaxResult;
        }
    }
}