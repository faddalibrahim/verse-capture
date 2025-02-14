import { pool } from '../db';

interface BibleVerse {
  book: string;
  chapter: number;
  verse: number;
  text: string;
}

export async function findVerseByReference(book: string, chapter: number, verse: number): Promise<BibleVerse | null> {
  try {
    const result = await pool.query(
      'SELECT * FROM kjv WHERE book = $1 AND chapter = $2 AND verse = $3',
      [book, chapter, verse]
    );
    return result.rows[0] || null;
  } catch (error) {
    console.error('Error finding verse:', error);
    return null;
  }
}

export async function searchVersesByText(searchText: string): Promise<BibleVerse[]> {
  try {
    const result = await pool.query(
      'SELECT * FROM kjv WHERE text ILIKE $1',
      [`%${searchText}%`]
    );
    return result.rows;
  } catch (error) {
    console.error('Error searching verses:', error);
    return [];
  }
}