<?php
/*
 * @version $Id: HEADER 15930 2011-10-30 15:47:55Z tsmr $
 -------------------------------------------------------------------------
 ocsinventoryng plugin for GLPI
 Copyright (C) 2015-2016 by the ocsinventoryng Development Team.

 https://github.com/pluginsGLPI/ocsinventoryng
 -------------------------------------------------------------------------

 LICENSE
      
 This file is part of ocsinventoryng.

 ocsinventoryng is free software; you can redistribute it and/or modify
 it under the terms of the GNU General Public License as published by
 the Free Software Foundation; either version 2 of the License, or
 (at your option) any later version.

 ocsinventoryng is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU General Public License for more details.

 You should have received a copy of the GNU General Public License
 along with ocsinventoryng. If not, see <http://www.gnu.org/licenses/>.
 --------------------------------------------------------------------------
 */

if (!defined('GLPI_ROOT')) {
   die("Sorry. You can't access directly to this file");
}

class PluginOcsinventoryngWinupdate extends CommonDBChild {

   // From CommonDBChild
   static public $itemtype = 'Computer';
   static public $items_id = 'computers_id';

   static $rightname = "plugin_ocsinventoryng";

   static function getTypeName($nb = 0) {
      return __('Windows Updates', 'ocsinventoryng');
   }

   function cleanDBonPurge() {

      $self = new self();
      $self->deleteByCriteria(array('computers_id' => $this->fields['id']));

   }

   /**
    * @see CommonGLPI::getTabNameForItem()
    **/
   function getTabNameForItem(CommonGLPI $item, $withtemplate = 0) {

      $plugin_ocsinventoryng_ocsservers_id = PluginOcsinventoryngOcslink::getOCSServerForItem($item);
      if ($plugin_ocsinventoryng_ocsservers_id > 0) {

         PluginOcsinventoryngOcsServer::checkOCSconnection($plugin_ocsinventoryng_ocsservers_id);
         $cfg_ocs = PluginOcsinventoryngOcsServer::getConfig($plugin_ocsinventoryng_ocsservers_id);
         // can exists for template
         if (($item->getType() == 'Computer')
             && Computer::canView()
             && $cfg_ocs["import_winupdatestate"]) {
            $nb = 0;
            if ($_SESSION['glpishow_count_on_tabs']) {
               $nb = countElementsInTable('glpi_plugin_ocsinventoryng_winupdates',
                                          "computers_id = '" . $item->getID() . "'");
            }
            return self::createTabEntry(self::getTypeName(Session::getPluralNumber()), $nb);
         }
         return '';
      }
      return '';
   }


   /**
    * @param $item            CommonGLPI object
    * @param $tabnum (default 1)
    * @param $withtemplate (default 0)
    *
    * @return bool|true
    */
   static function displayTabContentForItem(CommonGLPI $item, $tabnum = 1, $withtemplate = 0) {

      self::showForComputer($item, $withtemplate);
      return true;
   }

   /**
    * Print the computers windows update states
    *
    * @param             $comp                  Computer object
    * @param bool|string $withtemplate boolean  Template or basic item (default '')
    *
    * @return Nothing
    */
   static function showForComputer(Computer $comp, $withtemplate = '') {
      global $DB;

      $ID = $comp->fields['id'];

      if (!$comp->getFromDB($ID)
          || !$comp->can($ID, READ)) {
         return false;
      }
      $canedit = $comp->canEdit($ID);

      echo "<div class='spaced center'>";

      if ($result = $DB->request('glpi_plugin_ocsinventoryng_winupdates', array('computers_id' => $ID))) {
         echo "<table class='tab_cadre_fixehov'>";
         $colspan = 5;
         echo "<tr class='noHover'><th colspan='$colspan'>" . self::getTypeName($result->numrows()) .
              "</th></tr>";

         if ($result->numrows() != 0) {

            $header = "<tr><th>" . __('AU Options', 'ocsinventoryng') . "</th>";
            $header .= "<th>" . __('Schedule Install Date', 'ocsinventoryng') . "</th>";
            $header .= "<th>" . __('Last Success Time', 'ocsinventoryng') . "</th>";
            $header .= "<th>" . __('Detect Success Time', 'ocsinventoryng') . "</th>";
            $header .= "<th>" . __('Download Success Time', 'ocsinventoryng') . "</th>";
            $header .= "</tr>";
            echo $header;

            Session::initNavigateListItems(__CLASS__,
               //TRANS : %1$s is the itemtype name,
               //        %2$s is the name of the item (used for headings of a list)
                                           sprintf(__('%1$s = %2$s'),
                                                   Computer::getTypeName(1), $comp->getName()));

            foreach ($result as $data) {
               echo "<tr class='tab_bg_2'>";
               echo "<td>" . self::getAuoptionsName($data['auoptions']) . "</td>";
               echo "<td>" . Html::convDateTime($data['scheduleinstalldate']) . "</td>";
               echo "<td>" . Html::convDateTime($data['lastsuccesstime']) . "</td>";
               echo "<td>" . Html::convDateTime($data['detectsuccesstime']) . "</td>";
               echo "<td>" . Html::convDateTime($data['downloadsuccesstime']) . "</td>";
               echo "</tr>";
               Session::addToNavigateListItems(__CLASS__, $data['id']);
            }
            echo $header;
         } else {
            echo "<tr class='tab_bg_2'><th colspan='$colspan'>" . __('No item found') . "</th></tr>";
         }

         echo "</table>";
      }
      echo "</div>";
   }

   /**
    * Get Auoptions Name
    *
    * @param $value Auoptions ID
    *
    * @return Auoptions|translated
    */
   static function getAuoptionsName($value) {

      switch ($value) {

         case 5 :
            return __('Automatic Updates is required and users can configure it', 'ocsinventoryng');

         case 4 :
            return __('Automatically download and schedule installation', 'ocsinventoryng');

         case 3 :
            return __('Automatically download and notify of installation', 'ocsinventoryng');

         case 2 :
            return __('Notify before download', 'ocsinventoryng');

         case 1 :
            return __('Disables AU', 'ocsinventoryng');
         default :
            // Return $value if not define
            return $value;
      }
   }
}