/*
 * Thực hiện khởi tạo đối tượng của trang html
 */
$(document).ready(function () {
    
    
    customerJS = new CustomerJS();
    
});
class CustomerJS {
    constructor() {
        this.loadData();

        this.initEvent();
    }
    loadData() {
        // kết hợp phân trang
        var fakeData = [];
        var totalRecord = 0;

        var pageIndex = $('#pageIndex').val();
        var pageSize = $('#pageSize option:selected').val();
        var currentTotalPage = $('.totalPage').text();
        if (parseInt(pageIndex) > parseInt(currentTotalPage)) {
            debugger
            pageIndex = currentTotalPage;
        }
        debugger
        $.ajax({
            method: 'GET',
            url: '/customer/{0}/{1}'.format(pageIndex, pageSize),

            async: false,
            success: function (res) {

                fakeData = res.Data;
                totalRecord = res.TotalRecord;

            }
        });
        $('.main-table tbody').empty();
        $.each(fakeData, function (index, item) {
            if (item) {
                var customer = item;


                var rowHTML = $('<tr class="grid-row"></tr>');
                var birthday = customer['Birthday'] ? customer['Birthday'] : "";
                var is5FoodMember = customer['Is5FoodMember'] ? customer['Is5FoodMember'] : "";
                var isGenerate = customer['Inactive'] ? customer['Inactive'] : "";

                var isVip = customer['Gender'] == 1 ? "Vip" : "Normal";

                rowHTML.append('<td class="grid-cell-inner" property = "Inactive" style="display:none;">' + (customer['Inactive']) + '</td>');
                rowHTML.append('<td class="grid-cell-inner" property = "CustomerID" style="display:none;">' + (customer['CustomerID'] || "") + '</td>');
                rowHTML.append('<td class="grid-cell-inner" property = "CustomerCode">' + (customer['CustomerCode'] || "") + '</td>');
                rowHTML.append('<td class="grid-cell-inner" property = "CustomerName">' + (customer['CustomerName'] || "") + '</td>');

                rowHTML.append('<td class="grid-cell-inner" property = "CompanyName">' + (customer['CompanyName'] || "") + '</td>');
                rowHTML.append('<td class="grid-cell-inner" property = "CompanyTaxCode">' + (customer['CompanyTaxCode'] || "") + '</td>');
                rowHTML.append('<td class="grid-cell-inner text-align-center" property = "Address">' + (customer['Address'] || "") + '</td>');
                rowHTML.append('<td class="grid-cell-inner" property = "Tel">' + (customer['Tel'] || "") + '</td>');
                rowHTML.append('<td class="grid-cell-inner" property = "Email">' + (customer['Email'] || "") + '</td>');
                rowHTML.append('<td class="grid-cell-inner" property = "MemberShipCode">' + (customer['MemberShipCode'] || "") + '</td>');
                rowHTML.append('<td class="grid-cell-inner text-align-center" property = "Gender">' + (isVip) + '</td>');
                rowHTML.append('<td class="grid-cell-inner text-align-right" property = "Amount">' + (customer['Amount']) + '</td>');
                rowHTML.append('<td class="grid-cell-inner text-align-center" property = "Description">' + (customer['Description'] || "") + '</td>');
                rowHTML.append('<td class="grid-cell-inner text-align-center" property = "Is5FoodMember">' + (is5FoodMember ? '<input type="checkbox" checked/>' : '<input type="checkbox"/>') + '</td>');
                rowHTML.append('<td class="grid-cell-inner text-align-center">' + (isGenerate ? '<input type="checkbox" checked/>' : '<input type="checkbox"/>') + '</td>');
                rowHTML.append('<td class="grid-cell-inner text-align-center" property = "Birthday" style = "display: none;">' + (customer['Birthday'] || "") + '</td>');

                $('.main-table tbody').append(rowHTML);


                //commonJS.setFirstRowSelected($('#tbCustomerList'));
            }
        });
        $('.main-table tbody tr:odd').addClass('even');
        $('.main-table tbody tr').on('click', function () {
            $('.main-table tbody tr').removeClass('row-selected');
            $(this).addClass('row-selected');
            $('.toolbar button.delete').removeAttr('disabled');
            $('.toolbar button.edit').removeAttr('disabled');
            $('.toolbar button.copy').removeAttr('disabled');
        });
        $('.main-table tbody tr').on('click', function () {
            if (event.ctrlKey) {
                debugger
                $('.main-table tbody tr').removeClass('row-selected');
                $(this).toggleClass('tick');
            } else {
                $('.main-table tbody tr').removeClass('tick');
            }
        });
        $('.totalRecord').text(totalRecord);
        var totalPage = (totalRecord / pageSize) + 1;
        $('.totalPage').text(parseInt(totalPage));
        if (parseInt(pageIndex) == parseInt(currentTotalPage)) {
            $('#pageIndex').val(currentTotalPage);
        }
        debugger
        switch (parseInt(pageIndex)) {
            case 1: {
                $('.page-first').attr('disabled', true);
                $('.page-first').css('cursor', 'default');
                $('.page-last').removeAttr('disabled');
                $('.page-last').css('cursor', 'pointer');
                break;
            }
            case parseInt(totalPage): {
                $('.page-last').attr('disabled', true);
                $('.page-last').css('cursor', 'default');
                $('.page-first').removeAttr('disabled');
                $('.page-first').css('cursor', 'pointer');
                break
                debugger
            }
            default: {
                $('.page-first').removeAttr('disabled');
                $('.page-first').css('cursor', 'pointer');
                $('.page-last').removeAttr('disabled');
                $('.page-last').css('cursor', 'pointer');

            }
        }


    }
    initEvent() {
        
        $('#pageIndex').on('keyup', this.EnterPaging.bind(this));
        $('#pageSize').on('change', this.OptionPaging.bind(this));
        $('.toolbar').on('click', 'button.add', this.btnAddOnClick.bind(this));
        $('#btnSaveDetail').on('click', this.AddNewCustomer.bind(this));
        $('#btnSaveAddDetail').on('click', this.AddSaveNewCustomer.bind(this));
        $('#btnCancelDialog').on('click', this.CloseDialog);
        $('#btnCancelDialogEdited').on('click', this.CloseDialogEdit);
        $('.toolbar').on('click', 'button.edit', this.OpenEditCustomer.bind(this));
        $('.toolbar').on('click', 'button.delete', this.DeleteCustomerDialog.bind(this));
        $('#btnSaveEdited').on('click', this.SaveCustomer.bind(this));
        $('#btnSaveAddEdited').on('click', this.SaveAddCustomer.bind(this));
        $('.btn-del-no').on('click', this.CloseDialogDel);
        $('.btn-del-yes').on('click', this.DeleteCustomer.bind(this));
        $('#name').on('click', this.RemoveValidate);
        $('#code').on('click', this.RemoveValidate);
        $('#tel').on('click', this.RemoveValidate);
        $('#nameEdit').on('click', this.RemoveValidate);
        $('#codeEdit').on('click', this.RemoveValidate);
        $('#telEdit').on('click', this.RemoveValidate);
        $('.page-next').on('click', this.NextPage.bind(this));
        $('.page-prev').on('click', this.PrevPage.bind(this));
        $('.page-first').on('click', this.FirstPage.bind(this));
        $('.page-last').on('click', this.LastPage.bind(this));
        $('.reload').on('click', this.Reload.bind(this));
        $('.page-reload').on('click', this.Reload.bind(this));



    }
    Reload() {
        var me = this;
        me.loadData;
    }
    /**Xóa trạng thái báo lỗi validate */
    RemoveValidate() {
        $(this).removeClass("display");
    }
    /**
     * Nhập trang bằng Enter
     * @param {any} event
     */
    EnterPaging(event) {


        var content = $('#pageIndex').val();
        var me = this;
        if (event.keyCode == 13) {
            if ($.isNumeric(content)) {
                me.loadData();
            } else {
                $('#pageIndex').val(1);
                me.loadData();
            }
        }
    }
    /**
     * Option biểu thị số lượng phần tử trong 1 trang
     * @param {any} event
     */
    OptionPaging(event) {
        var me = this;

        me.loadData();
    }
    /**
     * Mở dialog Thêm khách hàng*/
    btnAddOnClick() {
        debugger
        $('.frmDetail').dialog({
            //autoOpen: false,
            width: 680,
            modal: true
        });

        var a = $('.frmDetail input').val("");
        $('#name').removeClass("display");
        $('#code').removeClass("display");
        $('#tel').removeClass("display");
        debugger
    }
    /**
     * Thêm khách hàng mới
     * */
    AddNewCustomer() {
        var flag = true;
        var me = this;
        var fields = $('.frmDetail [property]');
        var object = {};

        $.each(fields, function (index, item) {
            var propertyName = item.getAttribute('property');
            var value = $(this).val();
            if (propertyName == "CustomerName") {
                if (value == "") {
                    debugger
                    $('#name').addClass("display");
                    $('#name .error-icon').hover(function () {
                        $('#name .error-message').addClass("display")
                    }, function () {
                        $('#name .error-message').removeClass("display");
                    }
                    );

                    flag = false;

                }
            }
            if (propertyName == "CustomerCode") {
                if (value == "") {
                    $('#code').addClass("display");
                    $('#code .error-icon').hover(function () {
                        $('#code .error-message').addClass("display")
                    }, function () {
                        $('#code .error-message').removeClass("display");
                    }
                    );
                    flag = false;

                }
            }
            if (propertyName == "Tel") {
                if (value == "") {
                    $('#tel').addClass("display");
                    $('#tel .error-icon').hover(function () {
                        $('#tel .error-message').addClass("display")
                    }, function () {
                        $('#tel .error-message').removeClass("display");
                    }
                    );
                    flag = false;
                    debugger
                }
            }
            if (propertyName == "Birthday") {
                if (value == "") {
                    debugger

                    value = "2019-09-08T00:00:00";
                }
            }

            object[propertyName] = value;
        });

        object['Is5FoodMember'] = false;
        object['Inactive'] = true;
        object['Amount'] = 0;
        if (flag) {
            $.ajax({
                method: 'POST',
                url: '/customer',
                contentType: 'application/json; charset=utf-8',
                data: JSON.stringify(object),
                success: function (res) {
                    if (res.Success) {
                        me.CloseDialog();
                        me.loadData();

                        //$('.dialog-add').dialog('close');

                    }
                    else {
                        alert(res.Message);
                    }
                }
            });
        }
        debugger
    }
    /**Thêm và mở hộp thoại Thêm mới */
    AddSaveNewCustomer() {
        //var me = this;
        var flag = true;
        var me = this;
        var fields = $('.frmDetail [property]');
        var object = {};
        $.each(fields, function (index, item) {
            var propertyName = item.getAttribute('property');
            var value = $(this).val();
            if (propertyName == "CustomerName") {
                if (value == "") {
                    debugger
                    $('#name').addClass("display");
                    $('#name .error-icon').hover(function () {
                        $('#name .error-message').addClass("display")
                    }, function () {
                        $('#name .error-message').removeClass("display");
                    }
                    );

                    flag = false;

                }
            }
            if (propertyName == "CustomerCode") {
                if (value == "") {
                    $('#code').addClass("display");
                    $('#code .error-icon').hover(function () {
                        $('#code .error-message').addClass("display")
                    }, function () {
                        $('#code .error-message').removeClass("display");
                    }
                    );
                    flag = false;

                }
            }
            if (propertyName == "Tel") {
                if (value == "") {
                    $('#tel').addClass("display");
                    $('#tel .error-icon').hover(function () {
                        $('#tel .error-message').addClass("display")
                    }, function () {
                        $('#tel .error-message').removeClass("display");
                    }
                    );
                    flag = false;
                    debugger
                }
            }
            if (propertyName == "Birthday") {
                if (value == "") {
                    debugger

                    value = "2019-09-08T00:00:00";
                }
            }

            object[propertyName] = value;
        });

        object['Is5FoodMember'] = 0;
        object['Inactive'] = 0;
        if (flag) {
            $.ajax({
                method: 'POST',
                url: '/customer',
                contentType: 'application/json; charset=utf-8',
                data: JSON.stringify(object),
                success: function (res) {
                    if (res.Success) {
                        me.loadData();
                        //$('.dialog-add').dialog('close');
                        $('.frmDetail').dialog('close');
                        $('form :input').val('');
                        me.btnAddOnClick();

                    }
                    else {
                        alert(res.Message);
                    }
                }
            });
        }
        debugger

    }
    /**Đóng dialog Thêm mới */
    CloseDialog() {
        $('.frmDetail').dialog('close');

    }
    /**Đóng dialog Chỉnh sửa khách hàng */
    CloseDialogEdit() {
        $('.frmAdd').dialog('close');

    }
    /**Mở Dialog Chỉnh sửa
     * */
    OpenEditCustomer() {
        var me = this;
        var object = {};
        var rowHTML = [];
        var rowHTML = $('.main-table tbody tr.row-selected td');
        $.each(rowHTML, function (index, item) {
            var propertyName = item.getAttribute("property");
            var value = item.innerHTML;
            object[propertyName] = value;

        });
        $('.frmAdd').dialog({
            //autoOpen: false,
            width: 680,
            modal: true
        });
        var fields = $('.frmAdd [property]');
        $.each(fields, function (index, item) {
            var propertyName = item.getAttribute('property');
            $(this).val(object[propertyName]);
            debugger
        });

        debugger

    }
    /**Lưu chỉnh sửa */
    SaveCustomer() {
        var flag = true;
        var me = this;
        var fields = $('.frmAdd [property]');
        var object = {};
        $.each(fields, function (index, item) {

            var propertyName = item.getAttribute('property');
            if (propertyName == "Inactive") {
                if (item.checked) { object['Inactive'] = false } else { object['Inactive'] = true; } debugger
            } else {
                var value = $(this).val();
                if (propertyName == "CustomerName") {
                    if (value == "") {
                        debugger
                        $('#nameEdit').addClass("display");
                        $('#nameEdit .error-icon').hover(function () {
                            $('#nameEdit .error-message').addClass("display")
                        }, function () {
                            $('#nameEdit .error-message').removeClass("display");
                        }
                        );

                        flag = false;

                    }
                }
                if (propertyName == "CustomerCode") {
                    if (value == "") {
                        $('#codeEdit').addClass("display");
                        $('#codeEdit .error-icon').hover(function () {
                            $('#codeEdit .error-message').addClass("display")
                        }, function () {
                            $('#codeEdit .error-message').removeClass("display");
                        }
                        );
                        flag = false;

                    }
                }
                if (propertyName == "Tel") {
                    if (value == "") {
                        $('#telEdit').addClass("display");
                        $('#telEdit .error-icon').hover(function () {
                            $('#telEdit .error-message').addClass("display")
                        }, function () {
                            $('#telEdit .error-message').removeClass("display");
                        }
                        );
                        flag = false;
                        debugger
                    }
                }
                if (propertyName == "Birthday") {
                    if (value == "") {
                        debugger

                        value = "2019-09-08T00:00:00";
                    }
                }
                object[propertyName] = value;
            }

        });
        if (flag) {
            $.ajax({
                method: 'PUT',
                url: '/customer',
                data: JSON.stringify(object),
                dataType: 'json',
                contentType: 'application/json; charset=utf-8',
                success: function (res) {
                    if (res.Success) {
                        debugger
                        $('.frmAdd').dialog('close');
                        me.loadData();
                        me.ResetButton();

                    }
                    else {
                        alert(res.Message);
                    }
                }
            });
        }
        debugger
    }
    /**Lưu và mở hộp thoại thêm mới */
    SaveAddCustomer() {
        var flag = true;
        var me = this;
        var fields = $('.frmAdd [property]');
        var object = {};
        $.each(fields, function (index, item) {

            var propertyName = item.getAttribute('property');
            if (propertyName == "Inactive") {
                if (item.checked) { object['Inactive'] = false } else { object['Inactive'] = true; } debugger
            } else {
                var value = $(this).val();
                if (propertyName == "CustomerName") {
                    if (value == "") {
                        debugger
                        $('#nameEdit').addClass("display");
                        $('#nameEdit .error-icon').hover(function () {
                            $('#nameEdit .error-message').addClass("display")
                        }, function () {
                            $('#nameEdit .error-message').removeClass("display");
                        }
                        );

                        flag = false;

                    }
                }
                if (propertyName == "CustomerCode") {
                    if (value == "") {
                        $('#codeEdit').addClass("display");
                        $('#codeEdit .error-icon').hover(function () {
                            $('#codeEdit .error-message').addClass("display")
                        }, function () {
                            $('#codeEdit .error-message').removeClass("display");
                        }
                        );
                        flag = false;

                    }
                }
                if (propertyName == "Tel") {
                    if (value == "") {
                        $('#telEdit').addClass("display");
                        $('#telEdit .error-icon').hover(function () {
                            $('#telEdit .error-message').addClass("display")
                        }, function () {
                            $('#telEdit .error-message').removeClass("display");
                        }
                        );
                        flag = false;
                        debugger
                    }
                }
                if (propertyName == "Birthday") {
                    if (value == "") {
                        debugger

                        value = "2019-09-08T00:00:00";
                    }
                }
                object[propertyName] = value;
            }
            if (propertyName == "CustomerID") {
                debugger
            }
        });
        if (flag) {
            $.ajax({
                method: 'PUT',
                url: '/customer',
                data: JSON.stringify(object),
                dataType: 'json',
                contentType: 'application/json; charset=utf-8',
                success: function (res) {
                    if (res.Success) {
                        debugger
                        $('.frmAdd').dialog('close');
                        me.loadData();
                        me.btnAddOnClick();
                    }
                    else {
                        alert(res.Message);
                    }
                }
            });
        }
        debugger
    }
    /**Mở hộp thoại xác nhận xóa */
    DeleteCustomerDialog() {
        $('.dialog-del').dialog({
            width: 400,
            height: 125,
            modal: true
        });
        var rowSelected = $('.row-selected,.tick');
        $('.del-text span').text('');
        if (rowSelected.length == 1) {
            var maKhachHang = rowSelected[0].children[2].innerHTML;
            var tenKhachHang = rowSelected[0].children[3].innerHTML;
            $('.del-cusno').append("<< Khách hàng " + maKhachHang);
            $('.del-cusname').append(" - " + tenKhachHang + " >>");
            debugger

        }
        else {
            $('.del-cusname').append(" những Khách hàng đã chọn ");
        }
    }
    /**Đóng hộp thoại xóa */
    CloseDialogDel() {
        $('.dialog-del').dialog('close');
    }
    /**Xóa người dùng */
    DeleteCustomer() {
        var me = this;
        var listID = [];
        var listRow = $('.row-selected,.tick ');
        debugger
        $.each(listRow, function (index, item) {
            var customerID = item.children[1].innerHTML;

            listID.push(customerID);
        });
        $.ajax({
            method: 'DELETE',
            url: '/customer',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(listID),
            success: function (res) {
                if (res.Success) {
                    $('.dialog-del').dialog('close');

                    me.loadData();
                    me.ResetButton();

                }

            }
        });
    }
    /**Thiết lập lại trạng thái các button */
    ResetButton() {
        $('.main-table tbody tr').removeClass('row-selected');
        $('.main-table tbody tr').removeClass('tick');
        $('.toolbar button.delete').attr('disabled', true);
        $('.toolbar button.copy').attr('disabled', true);
        $('.toolbar button.edit').attr('disabled', true);
    }
    /**Trang tiếp theo */
    NextPage() {
        debugger
        var me = this;
        
        var pageIndex = parseInt($('#pageIndex').val());
        var totalPage = parseInt($('.totalPage').text());


        if (pageIndex == totalPage) {
            $('.page-next').attr('disabled', true);
            $('.page-next').css('cursor', 'default');
        }
        else {
            pageIndex = pageIndex + 1;
            $('#pageIndex').val(pageIndex);
            me.loadData();
            $('.page-prev').removeAttr('disabled');
            $('.page-first').removeAttr('disabled');
            $('.page-prev').css('cursor', 'pointer');
            $('.page-first').css('cursor', 'pointer');
        }
    }
    PrevPage() {
        var me = this;
        
        var pageIndex = parseInt($('#pageIndex').val());
        var totalPage = parseInt($('.totalPage').text());


        if (pageIndex == 1) {
            $('.page-prev').attr('disabled', true);
            $('.page-prev').css('cursor', 'default');
        }
        else {
            pageIndex = pageIndex  - 1;
            $('#pageIndex').val(pageIndex);
            me.loadData();
            $('.page-prev').removeAttr('disabled');
            $('.page-first').removeAttr('disabled');
            $('.page-prev').css('cursor', 'pointer');
            $('.page-first').css('cursor', 'pointer');
        }
    }
    FirstPage() {
        var me = this;
        $('#pageIndex').val(1);
        me.loadData();
        
    }
    LastPage() {
        var me = this;
        var totalPage = parseInt($('.totalPage').text());
        $('#pageIndex').val(totalPage);
        me.loadData();
    }
}