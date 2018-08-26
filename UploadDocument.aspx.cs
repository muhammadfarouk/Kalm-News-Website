using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class UploadDocument : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        try
        {
            var parser = new HttpMultipartParser.MultipartFormDataParser(Request.InputStream);
            if (parser.Files != null)
            {
                if (parser.Files.Count > 0)
                {
                    var file = parser.Files.First();
                    string path = Server.MapPath("\\Images\\" + Request.QueryString["Name"].ToString());
                    byte[] fileBytes = ReadFully(file.Data);
                    
                    FileStream MyFileStream = new FileStream(path, FileMode.Create);                                   
                    MyFileStream.Write(fileBytes, 0, fileBytes.Length);
                    MyFileStream.Close();

                    string s = "{\"result\":{\"result\":\"OK\"" + ",\"details\":\"" + "NO ERROR" + "\"}}";
                    HttpContext.Current.Response.BinaryWrite(Encoding.UTF8.GetBytes(s));
                }
                else
                    throw new Exception("No File was found");
            }
            else
                throw new Exception("No File was found");                    
        }
        catch (Exception ex)
        {            
        }
    }

    public static byte[] ReadFully(System.IO.Stream input)
    {
        byte[] buffer = new byte[16 * 1024];
        using (System.IO.MemoryStream ms = new System.IO.MemoryStream())
        {
            int read;
            while ((read = input.Read(buffer, 0, buffer.Length)) > 0)
            {
                ms.Write(buffer, 0, read);
            }
            return ms.ToArray();
        }
    }
}