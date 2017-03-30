<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
  <xsl:template match="/mixedteams">
    <html>
      <head>
        <meta charset="UTF-8"/>
        <style>
          html, body {
            min-height: 100vh;
            margin: 0;
            padding: 0;
          }

          body {
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
          }

          table {
            margin: 1.5rem 0;
            border-collapse: collapse;
            text-align: center;
          }

          table th, table td {
            border: 1px solid #000;
            overflow: hidden;
          }
        </style>
      </head>
      <body>
        <xsl:for-each select="baseball">
          <xsl:variable name="bgc" select="BColor"/>
          <xsl:variable name="tc" select="Color"/>
          <xsl:variable name="logo" select="Image"/>
          <xsl:variable name="video" select="Video"/>

          <table style="width: 640px; background-color: {$bgc}; color: {$tc};">
            <tbody>
              <tr>
                <td colspan="5"><b><xsl:value-of select="Team"/></b></td>
              </tr>
              <tr>
                <td>Image</td>
                <td colspan="2">star</td>
                <td>Coach</td>
                <td>League</td>
              </tr>
              <tr>
                <td><img src="{$logo}" style="width: 96px;"/></td>
                <xsl:apply-templates select="star"/>
                <td><xsl:value-of select="Coach"/></td>
                <td><xsl:value-of select="League"/></td>
              </tr>
              <tr>
                <td colspan="5">
                  <iframe width="640" height="360" src="{$video}" frameborder="0"></iframe>
                </td>
              </tr>
            </tbody>
          </table>
        </xsl:for-each>
      </body>
    </html>
  </xsl:template>

  <xsl:template match="star">
    <td><xsl:value-of select="name"/></td>
    <td>Birth: <xsl:value-of select="birth"/></td>
  </xsl:template>
</xsl:stylesheet>
