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
public class Contact
{
    public Contact()
    {
        //
        // TODO: Add constructor logic here
        //
    }

    public int? ID { get; set; }
    public DateTime Cdate { get; set; }
    public string Name { get; set; }
    public string Email { get; set; }
    public string Website { get; set; }
    public string Subject { get; set; }
    public string Message { get; set; }

    public static void ContactAdd(HttpContext context)
    {
        DatabaseConnection con = new DatabaseConnection();
        System.Collections.ArrayList param = new System.Collections.ArrayList();
        byte[] bytes = context.Request.BinaryRead(context.Request.TotalBytes);
        string jsonString = Encoding.UTF8.GetString(bytes);
        var oneObject = Newtonsoft.Json.JsonConvert.DeserializeObject<Contact>(jsonString);
        
        param.Add(new System.Data.SqlClient.SqlParameter("@Name", oneObject.Name));
        param.Add(new System.Data.SqlClient.SqlParameter("@Message", oneObject.Message));
        if (oneObject.Email != null)
            param.Add(new System.Data.SqlClient.SqlParameter("@Email", oneObject.Email));
        if (oneObject.Website != null)
            param.Add(new System.Data.SqlClient.SqlParameter("@Website", oneObject.Website));
        if (oneObject.Subject != null)
            param.Add(new System.Data.SqlClient.SqlParameter("@Subject", oneObject.Subject));

        con.ExecSpNone("ContactAdd", param);

        context.Response.BinaryWrite(Encoding.UTF8.GetBytes("{\"result\":{\"result\":\"OK\",\"details\":\"NO ERROR\"}}"));
    }
    public static void ContactSearch(HttpContext context)
    {
        DatabaseConnection con = new DatabaseConnection();
        System.Collections.ArrayList param = new System.Collections.ArrayList();
        byte[] bytes = context.Request.BinaryRead(context.Request.TotalBytes);
        string jsonString = Encoding.UTF8.GetString(bytes);

        param.Add(new System.Data.SqlClient.SqlParameter("@PageNumber", int.Parse(context.Request.QueryString["PageNumber"])));
        param.Add(new System.Data.SqlClient.SqlParameter("@PageSize", int.Parse(context.Request.QueryString["PageSize"])));

        DataTable dt = con.ExecSpSelect("ContactSearch", param);
        string s = "{\"result\": {\"result\": \"OK\",\"details\": \"NO ERROR\"},\"Rows\":" + con.DataTableToJson(dt) + "}";
        context.Response.BinaryWrite(Encoding.UTF8.GetBytes(s));
    }
    public static void ContactDelete(HttpContext context)
    {
        DatabaseConnection con = new DatabaseConnection();
        System.Collections.ArrayList param = new System.Collections.ArrayList();
        param.Add(new System.Data.SqlClient.SqlParameter("@ID", int.Parse(context.Request.QueryString["ID"])));
        con.ExecSpNone("ContactDelete", param);
        context.Response.BinaryWrite(Encoding.UTF8.GetBytes("{\"result\":{\"result\":\"OK\",\"details\":\"NO ERROR\"}}"));
    }

}