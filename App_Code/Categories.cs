using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;
using System.Data;
using Newtonsoft.Json.Linq;

/// <summary>
/// Summary description for Loockup
/// </summary>
public class Categories
{
    public Categories()
    {
        //
        // TODO: Add constructor logic here
        //
    }

    public int? ID { get; set; }
    public string Title { get; set; }
    public int? Type { get; set; }
    public DateTime Cdate { get; set; }
    public int? ViewOrder { get; set; }
    
    public static void CategoriesAdd(HttpContext context)
    {
        DatabaseConnection con = new DatabaseConnection();
        System.Collections.ArrayList param = new System.Collections.ArrayList();
        byte[] bytes = context.Request.BinaryRead(context.Request.TotalBytes);
        string jsonString = Encoding.UTF8.GetString(bytes);
        var oneObject = Newtonsoft.Json.JsonConvert.DeserializeObject<Categories>(jsonString);

        param.Add(new System.Data.SqlClient.SqlParameter("@Title", oneObject.Title));
        param.Add(new System.Data.SqlClient.SqlParameter("@Type", oneObject.Type));
        param.Add(new System.Data.SqlClient.SqlParameter("@ViewOrder", oneObject.ViewOrder));

        con.ExecSpNone("CategoriesAdd", param);

        context.Response.BinaryWrite(Encoding.UTF8.GetBytes("{\"result\":{\"result\":\"OK\",\"details\":\"NO ERROR\"}}"));
    }
    public static void CategoriesEdit(HttpContext context)
    {
        DatabaseConnection con = new DatabaseConnection();
        System.Collections.ArrayList param = new System.Collections.ArrayList();
        byte[] bytes = context.Request.BinaryRead(context.Request.TotalBytes);
        string jsonString = Encoding.UTF8.GetString(bytes);
        var oneObject = Newtonsoft.Json.JsonConvert.DeserializeObject<Categories>(jsonString);

        param.Add(new System.Data.SqlClient.SqlParameter("@ID", oneObject.ID));
        param.Add(new System.Data.SqlClient.SqlParameter("@Title", oneObject.Title));
        param.Add(new System.Data.SqlClient.SqlParameter("@Type", oneObject.Type));
        param.Add(new System.Data.SqlClient.SqlParameter("@ViewOrder", oneObject.ViewOrder));

        con.ExecSpNone("CategoriesEdit", param);

        context.Response.BinaryWrite(Encoding.UTF8.GetBytes("{\"result\":{\"result\":\"OK\",\"details\":\"NO ERROR\"}}"));
    }
    public static void CategoriesSearch(HttpContext context)
    {
        DatabaseConnection con = new DatabaseConnection();
        System.Collections.ArrayList param = new System.Collections.ArrayList();
        byte[] bytes = context.Request.BinaryRead(context.Request.TotalBytes);
        string jsonString = Encoding.UTF8.GetString(bytes);
        var oneObject = Newtonsoft.Json.JsonConvert.DeserializeObject<Categories>(jsonString);

        if (oneObject != null)
        {
            if (oneObject.ID != null)
                param.Add(new System.Data.SqlClient.SqlParameter("@ID", oneObject.ID));
            if (oneObject.Title != null)
                param.Add(new System.Data.SqlClient.SqlParameter("@Title", oneObject.Title));
            if (oneObject.Type != null)
                param.Add(new System.Data.SqlClient.SqlParameter("@Type", oneObject.Type));
        }

        param.Add(new System.Data.SqlClient.SqlParameter("@PageNumber", int.Parse(context.Request.QueryString["PageNumber"])));
        param.Add(new System.Data.SqlClient.SqlParameter("@PageSize", int.Parse(context.Request.QueryString["PageSize"])));

        DataTable dt = con.ExecSpSelect("CategoriesSearch", param);
        string s = "{\"result\": {\"result\": \"OK\",\"details\": \"NO ERROR\"},\"Rows\":" + con.DataTableToJson(dt) + "}";
        context.Response.BinaryWrite(Encoding.UTF8.GetBytes(s));
    }
    public static void CategoriesDelete(HttpContext context)
    {
        DatabaseConnection con = new DatabaseConnection();
        System.Collections.ArrayList param = new System.Collections.ArrayList();
        param.Add(new System.Data.SqlClient.SqlParameter("@ID", int.Parse(context.Request.QueryString["ID"])));
        con.ExecSpNone("CategoriesDelete", param);
        context.Response.BinaryWrite(Encoding.UTF8.GetBytes("{\"result\":{\"result\":\"OK\",\"details\":\"NO ERROR\"}}"));
    }
}