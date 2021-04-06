import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Settings = {
  notifications: boolean;
  language: string;
};
type ModifySettings = {
  setNotifications: (value: boolean) => void;
  setLanguage: (value: string) => void;
};

export const settingsKey: string = "settings";
export const settingsDefault: Settings = {
  notifications: false,
  language: "sv",
};

/**
 * Hook returning the settings and functions to modify the settings.
 *
 * @example
 * Get stored settings and print them:
 * ```
 * const [settings, modifySettings] = Storage.useSettings();
 * console.log(settings);
 * ```
 *
 * @example
 * Turn on notifications:
 * ```
 * const [settings, modifySettings] = Storage.useSettings();
 * modifySettings.setNotifications(true);
 * ```
 */
export const useSettings = (): [Settings, ModifySettings] => {
  const [settings, setSettings] = useState<Settings>(settingsDefault);

  /**
   * Sets the notifications and updates AsyncStorage.
   *
   * @param value - The value to set notifications to
   */
  const setNotifications = (value: boolean): void => {
    let newSettings = { ...settings, notifications: value };
    AsyncStorage.setItem(settingsKey, JSON.stringify(newSettings))
      .then(() => setSettings(newSettings));
  }

  /**
   * Sets the language and updates AsyncStorage.
   *
   * @param value - The two letter language code
   */
  const setLanguage = (value: string): void => {
    let newSettings = { ...settings, language: value };
    AsyncStorage.setItem(settingsKey, JSON.stringify(newSettings))
      .then(() => setSettings(newSettings));
  }

  const modifySettings: ModifySettings = {
    setNotifications: setNotifications,
    setLanguage: setLanguage,
  };

  useEffect(() => {
    AsyncStorage.getItem(settingsKey)
    .then(value => value === null ? settingsDefault : JSON.parse(value))
    .then(value => setSettings(value));
  }, []);

  return [settings, modifySettings];
}
