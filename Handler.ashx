<%@ WebHandler Language="C#" Class="Handler" %>

using System;
using System.Linq;
using System.Web;

public class Handler : IHttpHandler
{

    public void ProcessRequest(HttpContext context)
    {
        #region Contact
        if (context.Request.QueryString["action"] == "ContactAdd")
            Contact.ContactAdd(context);
        else if (context.Request.QueryString["action"] == "ContactSearch")
            Contact.ContactSearch(context);
        else if (context.Request.QueryString["action"] == "ContactDelete")
            Contact.ContactDelete(context);
        #endregion

        #region Categories
        else if (context.Request.QueryString["action"] == "CategoriesAdd")
            Categories.CategoriesAdd(context);
        else if (context.Request.QueryString["action"] == "CategoriesEdit")
            Categories.CategoriesEdit(context);
        else if (context.Request.QueryString["action"] == "CategoriesSearch")
            Categories.CategoriesSearch(context);
        else if (context.Request.QueryString["action"] == "CategoriesDelete")
            Categories.CategoriesDelete(context);
        #endregion

        #region Items
        else if (context.Request.QueryString["action"] == "ItemsAdd")
            Items.ItemsAdd(context);
        else if (context.Request.QueryString["action"] == "ItemsEdit")
            Items.ItemsEdit(context);
        else if (context.Request.QueryString["action"] == "ItemsSearch")
            Items.ItemsSearch(context);
        else if (context.Request.QueryString["action"] == "ItemsSearchTags")
            Items.ItemsSearchTags(context);    
        else if (context.Request.QueryString["action"] == "ItemsDelete")
            Items.ItemsDelete(context);
        #endregion
    }

    public bool IsReusable
    {
        get
        {
            return false;
        }
    }

}