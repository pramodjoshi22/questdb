/*******************************************************************************
 *     ___                  _   ____  ____
 *    / _ \ _   _  ___  ___| |_|  _ \| __ )
 *   | | | | | | |/ _ \/ __| __| | | |  _ \
 *   | |_| | |_| |  __/\__ \ |_| |_| | |_) |
 *    \__\_\\__,_|\___||___/\__|____/|____/
 *
 *  Copyright (c) 2014-2019 Appsicle
 *  Copyright (c) 2019-2020 QuestDB
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 *
 ******************************************************************************/

package io.questdb.std;

import java.util.Arrays;

public class IntLongHashMap extends AbstractIntHashSet {
    private static final int noEntryValue = -1;
    private long[] values;

    public IntLongHashMap() {
        this(8);
    }

    public IntLongHashMap(int initialCapacity) {
        this(initialCapacity, 0.5f);
    }

    private IntLongHashMap(int initialCapacity, double loadFactor) {
        super(initialCapacity, loadFactor);
        values = new long[keys.length];
        clear();
    }

    public long get(int key) {
        return valueAt(keyIndex(key));
    }

    public void put(int key, long value) {
        putAt(keyIndex(key), key, value);
    }

    public void putAt(int index, int key, long value) {
        if (index < 0) {
            Unsafe.arrayPut(values, -index - 1, value);
        } else {
            Unsafe.arrayPut(keys, index, key);
            Unsafe.arrayPut(values, index, value);
            if (--free == 0) {
                rehash();
            }
        }
    }

    public long valueAt(int index) {
        return index < 0 ? values[-index - 1] : noEntryValue;
    }

    @Override
    protected void erase(int index) {
        Unsafe.arrayPut(keys, index, this.noEntryKeyValue);
    }

    @Override
    protected void move(int from, int to) {
        Unsafe.arrayPut(keys, to, keys[from]);
        Unsafe.arrayPut(values, to, values[from]);
        erase(from);
    }

    private void rehash() {
        int size = size();
        int newCapacity = capacity * 2;
        mask = newCapacity - 1;
        free = capacity = newCapacity;
        int arrayCapacity = (int) (newCapacity / loadFactor);

        long[] oldValues = values;
        int[] oldKeys = keys;
        this.keys = new int[arrayCapacity];
        this.values = new long[arrayCapacity];
        Arrays.fill(keys, noEntryKeyValue);

        free -= size;
        for (int i = oldKeys.length; i-- > 0; ) {
            int key = oldKeys[i];
            if (key != noEntryKeyValue) {
                final int index = keyIndex(key);
                Unsafe.arrayPut(keys, index, key);
                Unsafe.arrayPut(values, index, oldValues[i]);
            }
        }
    }
}