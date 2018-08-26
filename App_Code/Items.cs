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
public class Items
{
    public Items()
    {
        //
        // TODO: Add constructor logic here
        //
    }

    public int? ID { get; set; }
    public string Title { get; set; }
    public int? CategoryID { get; set; }
    public DateTime Cdate { get; set; }
    public string ItemContent { get; set; }
    public string Photo { get; set; }
    public string Video { get; set; }
    public string VideoEmbed { get; set; }
    public string Tags { get; set; }
    public int? ViewOrder { get; set; }
    public bool? Urgent { get; set; }
    public bool? Popular { get; set; }
    public bool? HomeSlider { get; set; }
    public bool? HomeLeftSide { get; set; }
    public bool? HomeView { get; set; }
    public string KeyWord { get; set; }

    public static void ItemsAdd(HttpContext context)
    {
        DatabaseConnection con = new DatabaseConnection();
        System.Collections.ArrayList param = new System.Collections.ArrayList();
        byte[] bytes = context.Request.BinaryRead(context.Request.TotalBytes);
        string jsonString = Encoding.UTF8.GetString(bytes);
        var oneObject = Newtonsoft.Json.JsonConvert.DeserializeObject<Items>(jsonString);

        param.Add(new System.Data.SqlClient.SqlParameter("@Title", oneObject.Title));
        param.Add(new System.Data.SqlClient.SqlParameter("@CategoryID", oneObject.CategoryID));
        param.Add(new System.Data.SqlClient.SqlParameter("@ItemContent", oneObject.ItemContent)); 

        if (oneObject.Photo != null)
            param.Add(new System.Data.SqlClient.SqlParameter("@Photo", oneObject.Photo));
        if (oneObject.Video != null)
            param.Add(new System.Data.SqlClient.SqlParameter("@Video", oneObject.Video));
        if (oneObject.VideoEmbed != null)
            param.Add(new System.Data.SqlClient.SqlParameter("@VideoEmbed", oneObject.VideoEmbed));
        if (oneObject.Tags != null)
            param.Add(new System.Data.SqlClient.SqlParameter("@Tags", oneObject.Tags));
        if (oneObject.ViewOrder != null)
            param.Add(new System.Data.SqlClient.SqlParameter("@ViewOrder", oneObject.ViewOrder));
        if (oneObject.Urgent != null)
            param.Add(new System.Data.SqlClient.SqlParameter("@Urgent", oneObject.Urgent));
        if (oneObject.Popular != null)
            param.Add(new System.Data.SqlClient.SqlParameter("@Popular", oneObject.Popular));
        if (oneObject.HomeSlider != null)
            param.Add(new System.Data.SqlClient.SqlParameter("@HomeSlider", oneObject.HomeSlider));
        if (oneObject.HomeLeftSide != null)
            param.Add(new System.Data.SqlClient.SqlParameter("@HomeLeftSide", oneObject.HomeLeftSide));
        if (oneObject.HomeView != null)
            param.Add(new System.Data.SqlClient.SqlParameter("@HomeView", oneObject.HomeView));

        con.ExecSpNone("ItemsAdd", param);

        context.Response.BinaryWrite(Encoding.UTF8.GetBytes("{\"result\":{\"result\":\"OK\",\"details\":\"NO ERROR\"}}"));
    }
    public static void ItemsEdit(HttpContext context)
    {
        DatabaseConnection con = new DatabaseConnection();
        System.Collections.ArrayList param = new System.Collections.ArrayList();
        byte[] bytes = context.Request.BinaryRead(context.Request.TotalBytes);
        string jsonString = Encoding.UTF8.GetString(bytes);
        var oneObject = Newtonsoft.Json.JsonConvert.DeserializeObject<Items>(jsonString);

        param.Add(new System.Data.SqlClient.SqlParameter("@ID", oneObject.ID));
        param.Add(new System.Data.SqlClient.SqlParameter("@Title", oneObject.Title));
        param.Add(new System.Data.SqlClient.SqlParameter("@CategoryID", oneObject.CategoryID));
        param.Add(new System.Data.SqlClient.SqlParameter("@ItemContent", oneObject.ItemContent));
        if (oneObject.Photo != null)
            param.Add(new System.Data.SqlClient.SqlParameter("@Photo", oneObject.Photo));
        if (oneObject.Video != null)
            param.Add(new System.Data.SqlClient.SqlParameter("@Video", oneObject.Video));
        if (oneObject.VideoEmbed != null)
            param.Add(new System.Data.SqlClient.SqlParameter("@VideoEmbed", oneObject.VideoEmbed));
        if (oneObject.Tags != null)
            param.Add(new System.Data.SqlClient.SqlParameter("@Tags", oneObject.Tags));
        if (oneObject.ViewOrder != null)
            param.Add(new System.Data.SqlClient.SqlParameter("@ViewOrder", oneObject.ViewOrder));
        if (oneObject.Urgent != null)
            param.Add(new System.Data.SqlClient.SqlParameter("@Urgent", oneObject.Urgent));
        if (oneObject.Popular != null)
            param.Add(new System.Data.SqlClient.SqlParameter("@Popular", oneObject.Popular));
        if (oneObject.HomeSlider != null)
            param.Add(new System.Data.SqlClient.SqlParameter("@HomeSlider", oneObject.HomeSlider));
        if (oneObject.HomeLeftSide != null)
            param.Add(new System.Data.SqlClient.SqlParameter("@HomeLeftSide", oneObject.HomeLeftSide));
        if (oneObject.HomeView != null)
            param.Add(new System.Data.SqlClient.SqlParameter("@HomeView", oneObject.HomeView));

        con.ExecSpNone("ItemsEdit", param);

        context.Response.BinaryWrite(Encoding.UTF8.GetBytes("{\"result\":{\"result\":\"OK\",\"details\":\"NO ERROR\"}}"));
    }
    public static void ItemsSearch(HttpContext context)
    {
        DatabaseConnection con = new DatabaseConnection();
        System.Collections.ArrayList param = new System.Collections.ArrayList();
        byte[] bytes = context.Request.BinaryRead(context.Request.TotalBytes);
        string jsonString = Encoding.UTF8.GetString(bytes);
        var oneObject = Newtonsoft.Json.JsonConvert.DeserializeObject<Items>(jsonString);

        if (oneObject != null)
        {
            if (oneObject.ID != null)
                param.Add(new System.Data.SqlClient.SqlParameter("@ID", oneObject.ID));
            if (oneObject.Title != null)
                param.Add(new System.Data.SqlClient.SqlParameter("@Title", oneObject.Title));
            if (oneObject.Tags != null)
                param.Add(new System.Data.SqlClient.SqlParameter("@Tags", oneObject.Tags));
            if (oneObject.CategoryID != null)
                param.Add(new System.Data.SqlClient.SqlParameter("@CategoryID", oneObject.CategoryID));
            if (oneObject.Urgent != null)
                param.Add(new System.Data.SqlClient.SqlParameter("@Urgent", oneObject.Urgent));
            if (oneObject.Popular != null)
                param.Add(new System.Data.SqlClient.SqlParameter("@Popular", oneObject.Popular));
            if (oneObject.HomeSlider != null)
                param.Add(new System.Data.SqlClient.SqlParameter("@HomeSlider", oneObject.HomeSlider));
            if (oneObject.HomeLeftSide != null)
                param.Add(new System.Data.SqlClient.SqlParameter("@HomeLeftSide", oneObject.HomeLeftSide));
            if (oneObject.HomeView != null)
                param.Add(new System.Data.SqlClient.SqlParameter("@HomeView", oneObject.HomeView));
            if (oneObject.KeyWord != null)
                param.Add(new System.Data.SqlClient.SqlParameter("@KeyWord", oneObject.KeyWord));
        }

        param.Add(new System.Data.SqlClient.SqlParameter("@PageNumber", int.Parse(context.Request.QueryString["PageNumber"])));
        param.Add(new System.Data.SqlClient.SqlParameter("@PageSize", int.Parse(context.Request.QueryString["PageSize"])));

        DataTable dt = con.ExecSpSelect("ItemsSearch", param);
        string s = "{\"result\": {\"result\": \"OK\",\"details\": \"NO ERROR\"},\"Rows\":" + con.DataTableToJson(dt) + "}";
        context.Response.BinaryWrite(Encoding.UTF8.GetBytes(s));
    }
    public static void ItemsDelete(HttpContext context)
    {
        DatabaseConnection con = new DatabaseConnection();
        System.Collections.ArrayList param = new System.Collections.ArrayList();
        param.Add(new System.Data.SqlClient.SqlParameter("@ID", int.Parse(context.Request.QueryString["ID"])));
        con.ExecSpNone("ItemsDelete", param);
        context.Response.BinaryWrite(Encoding.UTF8.GetBytes("{\"result\":{\"result\":\"OK\",\"details\":\"NO ERROR\"}}"));
    }

    public static void ItemsSearchTags(HttpContext context)
    {
        DatabaseConnection con = new DatabaseConnection();
        System.Collections.ArrayList param = new System.Collections.ArrayList();;

        DataTable dt = con.ExecSpSelect("ItemsSearchTags", param);

        string s = "{\"result\": {\"result\": \"OK\",\"details\": \"NO ERROR\"},\"Rows\":" + con.DataTableToJson(dt) + "}";
        context.Response.BinaryWrite(Encoding.UTF8.GetBytes(s));
    }
}