const assert = require('chai').assert
const gdal = require('../lib/gdal.js')
const fileUtils = require('./utils/file.js')

describe('gdal.RasterBand', () => {
  afterEach(gc)

  it('should not be instantiable', () => {
    assert.throws(() => {
      new gdal.RasterBand()
    })
  })
  describe('instance', () => {
    describe('"ds" property', () => {
      describe('getter', () => {
        it('should return gdal.Dataset', () => {
          const ds = gdal.open('temp', 'w', 'MEM', 256, 256, 1, gdal.GDT_Byte)
          const band = ds.bands.get(1)
          assert.equal(band.ds, ds)
        })
      })
      describe('setter', () => {
        it('should throw error', () => {
          const ds = gdal.open('temp', 'w', 'MEM', 256, 256, 1, gdal.GDT_Byte)
          const band = ds.bands.get(1)
          assert.throws(() => {
            band.ds = null
          })
        })
      })
    })
    describe('"colorInterpretation" property', () => {
      describe('getter', () => {
        it('should return colorInterpretation', () => {
          const ds = gdal.open(`${__dirname}/data/sample.tif`)
          const band = ds.bands.get(1)
          assert.equal(band.colorInterpretation, gdal.GCI_GrayIndex)
        })
        it('should throw error if dataset already closed', () => {
          const ds = gdal.open(`${__dirname}/data/sample.tif`)
          const band = ds.bands.get(1)
          ds.close()
          assert.throws(() => {
            console.log(band.colorInterpretation)
          })
        })
      })
      describe('setter', () => {
        it('should set colorInterpretation', () => {
          const ds = gdal.open('temp', 'w', 'MEM', 256, 256, 1, gdal.GDT_Byte)
          const band = ds.bands.get(1)
          band.colorInterpretation = gdal.GCI_RedBand
          assert.equal(band.colorInterpretation, gdal.GCI_RedBand)
        })
        it('should throw error if dataset already closed', () => {
          const ds = gdal.open('temp', 'w', 'MEM', 256, 256, 1, gdal.GDT_Byte)
          const band = ds.bands.get(1)
          ds.close()
          assert.throws(() => {
            band.colorInterpretation = gdal.GCI_RedBand
          })
        })
      })
    })
    describe('"description" property', () => {
      describe('getter', () => {
        it('should return string', () => {
          const ds = gdal.open(`${__dirname}/data/dem_azimuth50_pa.img`)
          const band = ds.bands.get(1)
          assert.equal(band.description, 'hshade17')
        })
        it('should throw error if dataset already closed', () => {
          const ds = gdal.open(`${__dirname}/data/dem_azimuth50_pa.img`)
          const band = ds.bands.get(1)
          ds.close()
          assert.throws(() => {
            console.log(band.description)
          })
        })
      })
      describe('setter', () => {
        it('should throw error', () => {
          const ds = gdal.open(`${__dirname}/data/dem_azimuth50_pa.img`)
          const band = ds.bands.get(1)
          assert.throws(() => {
            band.description = 'test'
          })
        })
      })
    })
    describe('"id" property', () => {
      describe('getter', () => {
        it('should return number', () => {
          const ds = gdal.open('temp', 'w', 'MEM', 256, 256, 1, gdal.GDT_Byte)
          const band = ds.bands.get(1)
          assert.equal(band.id, 1)
        })
        it('should throw error if dataset already closed', () => {
          const ds = gdal.open('temp', 'w', 'MEM', 256, 256, 1, gdal.GDT_Byte)
          const band = ds.bands.get(1)
          ds.close()
          assert.throws(() => {
            console.log(band.id)
          })
        })
      })
      describe('setter', () => {
        it('should throw error', () => {
          const ds = gdal.open('temp', 'w', 'MEM', 256, 256, 1, gdal.GDT_Byte)
          const band = ds.bands.get(1)
          assert.throws(() => {
            band.id = 5
          })
        })
      })
    })
    describe('"size" property', () => {
      describe('getter', () => {
        it('should return object', () => {
          const ds = gdal.open('temp', 'w', 'MEM', 128, 256, 1, gdal.GDT_Byte)
          const band = ds.bands.get(1)
          assert.deepEqual(band.size, { x: 128, y: 256 })
        })
        it('should throw error if dataset already closed', () => {
          const ds = gdal.open('temp', 'w', 'MEM', 256, 256, 1, gdal.GDT_Byte)
          const band = ds.bands.get(1)
          ds.close()
          assert.throws(() => {
            console.log(band.size)
          })
        })
      })
      describe('setter', () => {
        it('should throw error', () => {
          const ds = gdal.open('temp', 'w', 'MEM', 256, 256, 1, gdal.GDT_Byte)
          const band = ds.bands.get(1)
          assert.throws(() => {
            band.size = { x: 128, y: 128 }
          })
        })
      })
    })
    describe('"blockSize" property', () => {
      describe('getter', () => {
        it('should return object', () => {
          const ds = gdal.open(`${__dirname}/data/sample.tif`)
          const band = ds.bands.get(1)
          assert.deepEqual(band.blockSize, { x: 984, y: 8 })
        })
        it('should throw error if dataset already closed', () => {
          const ds = gdal.open('temp', 'w', 'MEM', 256, 256, 1, gdal.GDT_Byte)
          const band = ds.bands.get(1)
          ds.close()
          assert.throws(() => {
            console.log(band.blockSize)
          })
        })
      })
      describe('setter', () => {
        it('should throw error', () => {
          const ds = gdal.open('temp', 'w', 'MEM', 256, 256, 1, gdal.GDT_Byte)
          const band = ds.bands.get(1)
          assert.throws(() => {
            band.blockSize = { x: 128, y: 128 }
          })
        })
      })
    })
    describe('"unitType" property', () => {
      describe('getter', () => {
        it('should return string', () => {
          const ds = gdal.open(`${__dirname}/data/sample.tif`)
          const band = ds.bands.get(1)
          assert.isString(band.unitType)
        })
        it('should throw error if dataset already closed', () => {
          const ds = gdal.open('temp', 'w', 'MEM', 256, 256, 1, gdal.GDT_Byte)
          const band = ds.bands.get(1)
          ds.close()
          assert.throws(() => {
            console.log(band.unitType)
          })
        })
      })
      describe('setter', () => {
        it('should set unitType', () => {
          const ds = gdal.open('temp', 'w', 'MEM', 256, 256, 1, gdal.GDT_Byte)
          const band = ds.bands.get(1)
          band.unitType = 'm'
          assert.equal(band.unitType, 'm')
        })
        it('should throw error if dataset already closed', () => {
          const ds = gdal.open('temp', 'w', 'MEM', 256, 256, 1, gdal.GDT_Byte)
          const band = ds.bands.get(1)
          ds.close()
          assert.throws(() => {
            band.unitType = 'm'
          })
        })
      })
    })
    describe('"dataType" property', () => {
      describe('getter', () => {
        it('should return dataType', () => {
          const ds = gdal.open(
            'temp',
            'w',
            'MEM',
            256,
            256,
            1,
            gdal.GDT_Float64
          )
          const band = ds.bands.get(1)
          assert.equal(band.dataType, gdal.GDT_Float64)
        })
        it('should throw error if dataset already closed', () => {
          const ds = gdal.open('temp', 'w', 'MEM', 256, 256, 1, gdal.GDT_Byte)
          const band = ds.bands.get(1)
          ds.close()
          assert.throws(() => {
            console.log(band.dataType)
          })
        })
      })
      describe('setter', () => {
        it('should throw error', () => {
          const ds = gdal.open('temp', 'w', 'MEM', 256, 256, 1, gdal.GDT_Byte)
          const band = ds.bands.get(1)
          assert.throws(() => {
            band.dataType = gdal.GDT_Float64
          })
        })
      })
    })
    describe('"readOnly" property', () => {
      describe('getter', () => {
        it('should return true on readOnly dataset', () => {
          const ds = gdal.open(`${__dirname}/data/sample.tif`)
          const band = ds.bands.get(1)
          assert.isTrue(band.readOnly)
        })
        it('should return false on writable dataset', () => {
          const ds = gdal.open('temp', 'w', 'MEM', 256, 256, 1, gdal.GDT_Byte)
          const band = ds.bands.get(1)
          assert.isFalse(band.readOnly)
        })
        it('should throw error if dataset already closed', () => {
          const ds = gdal.open('temp', 'w', 'MEM', 256, 256, 1, gdal.GDT_Byte)
          const band = ds.bands.get(1)
          ds.close()
          assert.throws(() => {
            console.log(band.readOnly)
          })
        })
      })
      describe('setter', () => {
        it('should throw error', () => {
          const ds = gdal.open('temp', 'w', 'MEM', 256, 256, 1, gdal.GDT_Byte)
          const band = ds.bands.get(1)
          assert.throws(() => {
            band.readOnly = true
          })
        })
      })
    })
    describe('"minimum" property', () => {
      describe('getter', () => {
        it('should return number', () => {
          const ds = gdal.open(`${__dirname}/data/dem_azimuth50_pa.img`)
          const band = ds.bands.get(1)
          assert.equal(band.minimum, 177)
        })
        it('should throw error if dataset already closed', () => {
          const ds = gdal.open('temp', 'w', 'MEM', 256, 256, 1, gdal.GDT_Byte)
          const band = ds.bands.get(1)
          ds.close()
          assert.throws(() => {
            console.log(band.minimum)
          })
        })
      })
      describe('setter', () => {
        it('should throw error', () => {
          const ds = gdal.open('temp', 'w', 'MEM', 256, 256, 1, gdal.GDT_Byte)
          const band = ds.bands.get(1)
          assert.throws(() => {
            band.minimum = 5
          })
        })
      })
    })
    describe('"maximum" property', () => {
      describe('getter', () => {
        it('should return number', () => {
          const ds = gdal.open(`${__dirname}/data/dem_azimuth50_pa.img`)
          const band = ds.bands.get(1)
          assert.equal(band.maximum, 182)
        })
        it('should throw error if dataset already closed', () => {
          const ds = gdal.open('temp', 'w', 'MEM', 256, 256, 1, gdal.GDT_Byte)
          const band = ds.bands.get(1)
          ds.close()
          assert.throws(() => {
            console.log(band.maximum)
          })
        })
      })
      describe('setter', () => {
        it('should throw error', () => {
          const ds = gdal.open('temp', 'w', 'MEM', 256, 256, 1, gdal.GDT_Byte)
          const band = ds.bands.get(1)
          assert.throws(() => {
            band.maximum = 5
          })
        })
      })
    })
    describe('"offset" property', () => {
      describe('getter', () => {
        it('should return number', () => {
          const ds = gdal.open('temp', 'w', 'MEM', 256, 256, 1, gdal.GDT_Byte)
          const band = ds.bands.get(1)
          assert.equal(band.offset, 0)
        })
        it('should throw error if dataset already closed', () => {
          const ds = gdal.open('temp', 'w', 'MEM', 256, 256, 1, gdal.GDT_Byte)
          const band = ds.bands.get(1)
          ds.close()
          assert.throws(() => {
            console.log(band.offset)
          })
        })
      })
      describe('setter', () => {
        it('should set offset', () => {
          const ds = gdal.open('temp', 'w', 'MEM', 256, 256, 1, gdal.GDT_Byte)
          const band = ds.bands.get(1)
          band.offset = 16
          assert.equal(band.offset, 16)
        })
        it('should throw error if dataset already closed', () => {
          const ds = gdal.open('temp', 'w', 'MEM', 256, 256, 1, gdal.GDT_Byte)
          const band = ds.bands.get(1)
          ds.close()
          assert.throws(() => {
            band.offset = 16
          })
        })
      })
    })
    describe('"scale" property', () => {
      describe('getter', () => {
        it('should return number', () => {
          const ds = gdal.open('temp', 'w', 'MEM', 256, 256, 1, gdal.GDT_Byte)
          const band = ds.bands.get(1)
          assert.equal(band.scale, 1)
        })
        it('should throw error if dataset already closed', () => {
          const ds = gdal.open('temp', 'w', 'MEM', 256, 256, 1, gdal.GDT_Byte)
          const band = ds.bands.get(1)
          ds.close()
          assert.throws(() => {
            console.log(band.scale)
          })
        })
      })
      describe('setter', () => {
        it('should set scale', () => {
          const ds = gdal.open('temp', 'w', 'MEM', 256, 256, 1, gdal.GDT_Byte)
          const band = ds.bands.get(1)
          band.scale = 2
          assert.equal(band.scale, 2)
        })
        it('should throw error if dataset already closed', () => {
          const ds = gdal.open('temp', 'w', 'MEM', 256, 256, 1, gdal.GDT_Byte)
          const band = ds.bands.get(1)
          ds.close()
          assert.throws(() => {
            band.scale = 2
          })
        })
      })
    })
    describe('"noDataValue" property', () => {
      describe('getter', () => {
        it('should return number', () => {
          const ds = gdal.open(`${__dirname}/data/dem_azimuth50_pa.img`)
          const band = ds.bands.get(1)
          assert.equal(band.noDataValue, 0)
        })
        it('should return null if not set', () => {
          const ds = gdal.open('temp', 'w', 'MEM', 256, 256, 1, gdal.GDT_Byte)
          const band = ds.bands.get(1)
          assert.isNull(band.noDataValue)
        })
        it('should throw error if dataset already closed', () => {
          const ds = gdal.open('temp', 'w', 'MEM', 256, 256, 1, gdal.GDT_Byte)
          const band = ds.bands.get(1)
          ds.close()
          assert.throws(() => {
            console.log(band.noDataValue)
          })
        })
      })
      describe('setter', () => {
        it('should set noDataValue', () => {
          const ds = gdal.open('temp', 'w', 'MEM', 256, 256, 1, gdal.GDT_Byte)
          const band = ds.bands.get(1)
          band.noDataValue = 5
          assert.equal(band.noDataValue, 5)
        })
        it('should throw error if dataset already closed', () => {
          const ds = gdal.open('temp', 'w', 'MEM', 256, 256, 1, gdal.GDT_Byte)
          const band = ds.bands.get(1)
          ds.close()
          assert.throws(() => {
            band.noDataValue = 5
          })
        })
      })
    })
    describe('"pixels" property', () => {
      describe('getter', () => {
        it('should return pixel collection', () => {
          const ds = gdal.open('temp', 'w', 'MEM', 256, 256, 1, gdal.GDT_Byte)
          const band = ds.bands.get(1)
          assert.instanceOf(band.pixels, gdal.RasterBandPixels)
        })
      })
      describe('setter', () => {
        it('should throw an error', () => {
          const ds = gdal.open('temp', 'w', 'MEM', 256, 256, 1, gdal.GDT_Byte)
          const band = ds.bands.get(1)
          assert.throws(() => {
            band.pixels = null
          })
        })
      })
      describe('get()', () => {
        it('should return a number', () => {
          const ds = gdal.open(`${__dirname}/data/sample.tif`)
          const band = ds.bands.get(1)
          assert.equal(band.pixels.get(200, 300), 10)
        })
        it('should throw an error if x,y is out of bounds', () => {
          const ds = gdal.open('temp', 'w', 'MEM', 256, 256, 1, gdal.GDT_Byte)
          const band = ds.bands.get(1)
          assert.throws(() => {
            band.pixels.get(-1, -1)
          })
        })
        it('should throw error if dataset already closed', () => {
          const ds = gdal.open('temp', 'w', 'MEM', 256, 256, 1, gdal.GDT_Byte)
          const band = ds.bands.get(1)
          ds.close()
          assert.throws(() => {
            band.pixels.get(200, 300)
          })
        })
      })
      describe('set()', () => {
        it('should set the pixel to the value', () => {
          const ds = gdal.open('temp', 'w', 'MEM', 256, 256, 1, gdal.GDT_Byte)
          const band = ds.bands.get(1)
          band.pixels.set(10, 20, 30)
          assert.equal(band.pixels.get(10, 20), 30)
          band.pixels.set(10, 20, 33.6)
          assert.equal(band.pixels.get(10, 20), 34)
        })
        it('should throw an error if x,y is out of bounds', () => {
          const ds = gdal.open('temp', 'w', 'MEM', 256, 256, 1, gdal.GDT_Byte)
          const band = ds.bands.get(1)
          assert.throws(() => {
            band.pixels.set(-1, -1, 20)
          })
        })
        it('should throw error if dataset already closed', () => {
          const ds = gdal.open('temp', 'w', 'MEM', 256, 256, 1, gdal.GDT_Byte)
          const band = ds.bands.get(1)
          ds.close()
          assert.throws(() => {
            band.pixels.set(10, 20, 30)
          })
        })
      })
      describe('read()', () => {
        it('should return a TypedArray', () => {
          const ds = gdal.open(`${__dirname}/data/sample.tif`)
          const band = ds.bands.get(1)
          const w = 20
          const h = 30
          const data = band.pixels.read(190, 290, w, h)
          assert.instanceOf(data, Uint8Array)
          assert.equal(data.length, w * h)
          assert.equal(data[10 * 20 + 10], 10)
        })
        describe('w/data argument', () => {
          it('should put the data in the existing array', () => {
            const ds = gdal.open(
              'temp',
              'w',
              'MEM',
              256,
              256,
              1,
              gdal.GDT_Byte
            )
            const band = ds.bands.get(1)
            const data = new Uint8Array(new ArrayBuffer(20 * 30))
            data[15] = 31
            const result = band.pixels.read(0, 0, 20, 30, data)
            assert.equal(data, result)
            assert.equal(data[15], 0)
          })
          it('should create new array if null', () => {
            const ds = gdal.open(
              'temp',
              'w',
              'MEM',
              256,
              256,
              1,
              gdal.GDT_Byte
            )
            const band = ds.bands.get(1)
            const data = band.pixels.read(0, 0, 20, 30, null)
            assert.instanceOf(data, Uint8Array)
            assert.equal(data.length, 20 * 30)
          })
          it('should throw error if array is too small', () => {
            const ds = gdal.open(
              'temp',
              'w',
              'MEM',
              256,
              256,
              1,
              gdal.GDT_Byte
            )
            const band = ds.bands.get(1)
            const data = new Uint8Array(new ArrayBuffer(20 * 30))
            assert.throws(() => {
              band.pixels.read(0, 0, 20, 31, data)
            })
          })
          it('should automatically translate data to array data type', () => {
            const ds = gdal.open(
              'temp',
              'w',
              'MEM',
              256,
              256,
              1,
              gdal.GDT_Byte
            )
            const band = ds.bands.get(1)
            band.pixels.set(1, 1, 30)
            const data = new Float64Array(new ArrayBuffer(20 * 30 * 8))
            band.pixels.read(1, 1, 20, 30, data)
            assert.equal(data[0], 30)
          })
        })
        describe('w/options', () => {
          describe('"buffer_width", "buffer_height"', () => {
            it('should default to width, height when not present', () => {
              const ds = gdal.open(
                'temp',
                'w',
                'MEM',
                256,
                256,
                1,
                gdal.GDT_Byte
              )
              const band = ds.bands.get(1)
              const data = band.pixels.read(0, 0, 20, 30)
              assert.equal(data.length, 20 * 30)
            })
            it("should create new array with given dimensions if array isn't given", () => {
              const ds = gdal.open(
                'temp',
                'w',
                'MEM',
                256,
                256,
                1,
                gdal.GDT_Byte
              )
              const band = ds.bands.get(1)
              const data = band.pixels.read(0, 0, 20, 30, null, {
                buffer_width: 10,
                buffer_height: 15
              })
              assert.equal(data.length, 10 * 15)
            })
            it('should throw error if given array is smaller than given dimensions', () => {
              const ds = gdal.open(
                'temp',
                'w',
                'MEM',
                256,
                256,
                1,
                gdal.GDT_Byte
              )
              const band = ds.bands.get(1)
              const data = new Float64Array(new ArrayBuffer(8 * 10 * 14))
              assert.throws(() => {
                band.pixels.read(0, 0, 20, 30, data, {
                  buffer_width: 10,
                  buffer_height: 15
                })
              }, /Array length must be greater than.*/)
            })
          })
          describe('"type"', () => {
            it('should be ignored if typed array is given', () => {
              const ds = gdal.open(
                'temp',
                'w',
                'MEM',
                256,
                256,
                1,
                gdal.GDT_Byte
              )
              const band = ds.bands.get(1)
              const data = new Float64Array(new ArrayBuffer(20 * 30 * 8))
              const result = band.pixels.read(0, 0, 20, 30, data, {
                type: gdal.GDT_Byte
              })
              assert.instanceOf(result, Float64Array)
            })
            it('should create output array with given type', () => {
              const ds = gdal.open(
                'temp',
                'w',
                'MEM',
                256,
                256,
                1,
                gdal.GDT_Byte
              )
              const band = ds.bands.get(1)
              const data = band.pixels.read(0, 0, 20, 30, null, {
                type: gdal.GDT_Float64
              })
              assert.instanceOf(data, Float64Array)
            })
          })
          describe('"pixel_space", "line_space"', () => {
            it('should read data with space between values', () => {
              const w = 16,
                h = 16
              const ds = gdal.open('temp', 'w', 'MEM', w, h, 2, gdal.GDT_Byte)
              const red = ds.bands.get(1)
              const blue = ds.bands.get(2)
              red.fill(1)
              blue.fill(2)

              const interleaved = new Uint8Array(new ArrayBuffer(w * h * 2))

              const read_options = {
                buffer_width: w,
                buffer_height: h,
                type: gdal.GDT_Byte,
                pixel_space: 2,
                line_space: 2 * w
              }

              red.pixels.read(0, 0, w, h, interleaved, read_options)
              blue.pixels.read(
                0,
                0,
                w,
                h,
                interleaved.subarray(1),
                read_options
              )

              for (let y = 0; y < h; y++) {
                for (let x = 0; x < w; x++) {
                  const r = interleaved[x * 2 + 0 + y * w * 2]
                  const b = interleaved[x * 2 + 1 + y * w * 2]
                  assert.equal(r, 1)
                  assert.equal(b, 2)
                }
              }
            })
            it('should throw error if array is not long enough to store result', () => {
              const w = 16,
                h = 16
              const ds = gdal.open('temp', 'w', 'MEM', w, h, 2, gdal.GDT_Byte)
              const red = ds.bands.get(1)
              const blue = ds.bands.get(2)
              red.fill(1)
              blue.fill(2)

              const interleaved = new Uint8Array(new ArrayBuffer(w * h * 2))
              const read_options = {
                buffer_width: w,
                buffer_height: h,
                type: gdal.GDT_Byte,
                pixel_space: 2,
                line_space: 2 * w
              }

              red.pixels.read(0, 0, w, h, interleaved, read_options)
              assert.throws(() => {
                blue.pixels.read(
                  0,
                  0,
                  w,
                  h,
                  interleaved.subarray(2),
                  read_options
                )
              }, /Array length must be greater than.*/)
            })
          })
          it('should throw an error if region is out of bounds', () => {
            const ds = gdal.open('temp', 'w', 'MEM', 16, 16, 1, gdal.GDT_Byte)
            const band = ds.bands.get(1)
            assert.throws(() => {
              band.pixels.read(20, 20, 16, 16)
            })
          })
          it('should throw error if dataset already closed', () => {
            const ds = gdal.open('temp', 'w', 'MEM', 16, 16, 1, gdal.GDT_Byte)
            const band = ds.bands.get(1)
            ds.close()
            assert.throws(() => {
              band.pixels.read(0, 0, 16, 16)
            })
          })
        })
      })
      describe('write()', () => {
        it('should write data from TypedArray', () => {
          const ds = gdal.open('temp', 'w', 'MEM', 256, 256, 1, gdal.GDT_Byte)
          const band = ds.bands.get(1)
          let i
          const w = 16,
            h = 16

          const data = new Uint8Array(new ArrayBuffer(w * h))
          for (i = 0; i < w * h; i++) data[i] = i

          band.pixels.write(100, 120, w, h, data)

          const result = band.pixels.read(100, 120, w, h, data)
          for (i = 0; i < w * h; i++) {
            assert.equal(result[i], data[i])
          }
        })
        it('should throw error if array is too small', () => {
          const ds = gdal.open('temp', 'w', 'MEM', 256, 256, 1, gdal.GDT_Byte)
          const band = ds.bands.get(1)
          const w = 16,
            h = 16
          const data = new Uint8Array(new ArrayBuffer(w * h - 1))

          assert.throws(() => {
            band.pixels.write(100, 120, w, h, data)
          })
        })
        it('should automatically translate data to array data type', () => {
          const ds = gdal.open('temp', 'w', 'MEM', 256, 256, 1, gdal.GDT_Byte)
          const band = ds.bands.get(1)
          let i
          const w = 16,
            h = 16

          const data = new Float64Array(new ArrayBuffer(8 * w * h))
          for (i = 0; i < w * h; i++) data[i] = i + 0.33

          band.pixels.write(100, 120, w, h, data)

          const result = band.pixels.read(100, 120, w, h, data)
          for (i = 0; i < w * h; i++) {
            assert.equal(result[i], Math.floor(data[i]))
          }
        })
        describe('w/options', () => {
          describe('"buffer_width", "buffer_height"', () => {
            it('should throw error if given array is smaller than given dimensions', () => {
              const ds = gdal.open(
                'temp',
                'w',
                'MEM',
                256,
                256,
                1,
                gdal.GDT_Byte
              )
              const band = ds.bands.get(1)
              const data = new Float64Array(new ArrayBuffer(10 * 14 * 8))
              assert.throws(() => {
                band.pixels.write(0, 0, 20, 30, data, {
                  buffer_width: 10,
                  buffer_height: 15
                })
              })
            })
          })
          describe('"pixel_space", "line_space"', () => {
            it('should skip spaces in given data', () => {
              let i
              const w = 16,
                h = 16
              const ds = gdal.open('temp', 'w', 'MEM', w, h, 2, gdal.GDT_Byte)
              const red = ds.bands.get(1)
              const blue = ds.bands.get(2)

              const interleaved = new Uint8Array(new ArrayBuffer(w * h * 2))
              for (let y = 0; y < h; y++) {
                for (let x = 0; x < w; x++) {
                  interleaved[x * 2 + 0 + y * w * 2] = 1
                  interleaved[x * 2 + 1 + y * w * 2] = 2
                }
              }

              const write_options = {
                buffer_width: w,
                buffer_height: h,
                pixel_space: 2,
                line_space: 2 * w
              }

              red.pixels.write(0, 0, w, h, interleaved, write_options)
              blue.pixels.write(
                0,
                0,
                w,
                h,
                interleaved.subarray(1),
                write_options
              )

              let data
              data = red.pixels.read(0, 0, w, h)
              for (i = 0; i < data.length; i++) assert.equal(data[i], 1)
              data = blue.pixels.read(0, 0, w, h)
              for (i = 0; i < data.length; i++) assert.equal(data[i], 2)
            })
            it('should throw error if array is not long enough', () => {
              const w = 16,
                h = 16
              const ds = gdal.open('temp', 'w', 'MEM', w, h, 2, gdal.GDT_Byte)
              const red = ds.bands.get(1)
              const blue = ds.bands.get(2)

              const interleaved = new Uint8Array(new ArrayBuffer(w * h * 2))

              const write_options = {
                buffer_width: w,
                buffer_height: h,
                pixel_space: 2,
                line_space: 2 * w
              }

              red.pixels.write(0, 0, w, h, interleaved, write_options)
              assert.throws(() => {
                blue.pixels.write(
                  0,
                  0,
                  w,
                  h,
                  interleaved.subarray(2),
                  write_options
                )
              })
            })
          })
        })
        it('should throw an error if region is out of bounds', () => {
          const ds = gdal.open('temp', 'w', 'MEM', 16, 16, 1, gdal.GDT_Byte)
          const band = ds.bands.get(1)
          const data = new Uint8Array(new ArrayBuffer(16 * 16))
          assert.throws(() => {
            band.pixels.write(20, 20, 16, 16, data)
          })
        })
        it('should throw error if dataset already closed', () => {
          const ds = gdal.open('temp', 'w', 'MEM', 16, 16, 1, gdal.GDT_Byte)
          const band = ds.bands.get(1)
          ds.close()
          const data = new Uint8Array(new ArrayBuffer(16 * 16))
          assert.throws(() => {
            band.pixels.write(0, 0, 16, 16, data)
          })
        })
      })
      describe('readBlock()', () => {
        it('should return TypedArray', () => {
          const ds = gdal.open(`${__dirname}/data/sample.tif`)
          const band = ds.bands.get(1)

          const data = band.pixels.readBlock(0, 0)
          assert.instanceOf(data, Uint8Array)
          assert.equal(data.length, band.blockSize.x * band.blockSize.y)
        })
        it('should throw error if offsets are out of range', () => {
          const ds = gdal.open(`${__dirname}/data/sample.tif`)
          const band = ds.bands.get(1)
          assert.throws(() => {
            band.pixels.readBlock(-1, 0)
          })
        })
        describe('w/ data argument', () => {
          it('should read data into existing', () => {
            const ds = gdal.open(`${__dirname}/data/sample.tif`)
            const band = ds.bands.get(1)
            const data = new Uint8Array(
              new ArrayBuffer(band.blockSize.x * band.blockSize.y)
            )
            const result = band.pixels.readBlock(0, 0, data)
            assert.equal(result, data)
          })
          it('should throw error if given array is not big enough', () => {
            const ds = gdal.open(`${__dirname}/data/sample.tif`)
            const band = ds.bands.get(1)
            const data = new Uint8Array(
              new ArrayBuffer(band.blockSize.x * band.blockSize.y - 1)
            )
            assert.throws(() => {
              band.pixels.readBlock(0, 0, data)
            })
          })
          it('should throw error if given array is not the right type', () => {
            const ds = gdal.open(`${__dirname}/data/sample.tif`)
            const band = ds.bands.get(1)
            const data = new Float64Array(
              new ArrayBuffer(8 * band.blockSize.x * band.blockSize.y)
            )
            assert.throws(() => {
              band.pixels.readBlock(0, 0, data)
            })
          })
        })
        it('should throw error if dataset already closed', () => {
          const ds = gdal.open(`${__dirname}/data/sample.tif`)
          const band = ds.bands.get(1)
          ds.close()
          assert.throws(() => {
            band.pixels.readBlock(0, 0)
          })
        })
      })
      describe('writeBlock()', () => {
        it('should write data from TypedArray', () => {
          let i
          const ds = gdal.open('temp', 'w', 'MEM', 16, 16, 1, gdal.GDT_Byte)
          const band = ds.bands.get(1)

          const length = band.blockSize.x * band.blockSize.y
          const data = new Uint8Array(new ArrayBuffer(length))
          for (i = 0; i < length; i++) data[i] = i

          band.pixels.writeBlock(0, 0, data)

          const result = band.pixels.readBlock(0, 0)
          for (i = 0; i < length; i++) {
            assert.equal(result[i], data[i])
          }
        })
        it('should throw error if offsets are out of range', () => {
          const ds = gdal.open('temp', 'w', 'MEM', 16, 16, 1, gdal.GDT_Byte)
          const band = ds.bands.get(1)

          const length = band.blockSize.x * band.blockSize.y
          const data = new Uint8Array(new ArrayBuffer(length))

          assert.throws(() => {
            band.pixels.writeBlock(0, 100, data)
          })
        })
        it('should throw error if given array is not big enough', () => {
          const ds = gdal.open('temp', 'w', 'MEM', 16, 16, 1, gdal.GDT_Byte)
          const band = ds.bands.get(1)

          const length = band.blockSize.x * band.blockSize.y - 1
          const data = new Uint8Array(new ArrayBuffer(length))

          assert.throws(() => {
            band.pixels.writeBlock(0, 0, data)
          })
        })
        it('should throw error if given array is not the right type', () => {
          const ds = gdal.open(`${__dirname}/data/sample.tif`)
          const band = ds.bands.get(1)

          const length = band.blockSize.x * band.blockSize.y
          const data = new Float64Array(new ArrayBuffer(length * 8))

          assert.throws(() => {
            band.pixels.writeBlock(0, 0, data)
          })
        })
        it('should throw error if dataset already closed', () => {
          const ds = gdal.open('temp', 'w', 'MEM', 16, 16, 1, gdal.GDT_Byte)
          const band = ds.bands.get(1)

          const length = band.blockSize.x * band.blockSize.y
          const data = new Uint8Array(new ArrayBuffer(length))
          ds.close()
          assert.throws(() => {
            band.pixels.writeBlock(0, 0, data)
          })
        })
      })
    })
    describe('"overviews" property', () => {
      describe('getter', () => {
        it('should return overview collection', () => {
          const ds = gdal.open('temp', 'w', 'MEM', 32, 32, 1, gdal.GDT_Byte)
          const band = ds.bands.get(1)
          assert.instanceOf(band.overviews, gdal.RasterBandOverviews)
        })
      })
      describe('setter', () => {
        it('should throw an error', () => {
          const ds = gdal.open('temp', 'w', 'MEM', 32, 32, 1, gdal.GDT_Byte)
          const band = ds.bands.get(1)
          assert.throws(() => {
            band.overviews = null
          })
        })
      })
      describe('count()', () => {
        it('should return a number', () => {
          const ds = gdal.open('temp', 'w', 'MEM', 32, 32, 1, gdal.GDT_Byte)
          const band = ds.bands.get(1)
          assert.equal(band.overviews.count(), 0)
        })
        it('should throw error if dataset already closed', () => {
          const ds = gdal.open('temp', 'w', 'MEM', 32, 32, 1, gdal.GDT_Byte)
          const band = ds.bands.get(1)
          ds.close()
          assert.throws(() => {
            band.overviews.count()
          })
        })
      })
      describe('get()', () => {
        it('should return a RasterBand', () => {
          const ds = gdal.open(
            fileUtils.clone(`${__dirname}/data/sample.tif`),
            'r+'
          )
          const band = ds.bands.get(1)
          ds.buildOverviews('NEAREST', [ 2 ])
          assert.instanceOf(band.overviews.get(0), gdal.RasterBand)
        })
        it('should throw error if dataset already closed', () => {
          const ds = gdal.open(
            fileUtils.clone(`${__dirname}/data/sample.tif`),
            'r+'
          )
          const band = ds.bands.get(1)
          ds.buildOverviews('NEAREST', [ 2 ])
          ds.close()
          assert.throws(() => {
            band.overviews.get(0)
          })
        })
        it('should throw error if id out of range', () => {
          const ds = gdal.open(
            fileUtils.clone(`${__dirname}/data/sample.tif`),
            'r+'
          )
          const band = ds.bands.get(1)
          ds.buildOverviews('NEAREST', [ 2 ])
          assert.throws(() => {
            band.overviews.get(2)
          })
        })
      })
      describe('forEach()', () => {
        it('should pass each overview to the callback', () => {
          const ds = gdal.open(
            fileUtils.clone(`${__dirname}/data/sample.tif`),
            'r+'
          )
          const band = ds.bands.get(1)
          ds.buildOverviews('NEAREST', [ 2, 4 ])
          const w = []
          band.overviews.forEach((overview, i) => {
            assert.isNumber(i)
            w.push(overview.size.x)
          })
          assert.sameMembers(w, [ ds.rasterSize.x / 2, ds.rasterSize.x / 4 ])
        })
        it('should throw error if dataset already closed', () => {
          const ds = gdal.open(
            fileUtils.clone(`${__dirname}/data/sample.tif`),
            'r+'
          )
          const band = ds.bands.get(1)
          ds.buildOverviews('NEAREST', [ 2 ])
          ds.close()
          assert.throws(() => {
            band.overviews.forEach(() => {})
          })
        })
      })
      describe('map()', () => {
        it('should operate normally', () => {
          const ds = gdal.open(
            fileUtils.clone(`${__dirname}/data/sample.tif`),
            'r+'
          )
          const band = ds.bands.get(1)
          ds.buildOverviews('NEAREST', [ 2, 4 ])

          const result = band.overviews.map((overview, i) => {
            assert.isNumber(i)
            assert.isNumber(overview.size.x)
            return 'a'
          })
          assert.isArray(result)
          assert.lengthOf(result, band.overviews.count())
          assert.equal(result[0], 'a')
        })
      })
    })
    describe('fill()', () => {
      it('should set all pixels to given value', () => {
        const ds = gdal.open('temp', 'w', 'MEM', 16, 16, 1, gdal.GDT_Byte)
        const band = ds.bands.get(1)
        band.fill(5)
        const data = band.pixels.read(0, 0, 16, 16)
        for (let i = 0; i < data.length; i++) {
          assert.equal(data[i], 5)
        }
      })
      it('should throw error if dataset already closed', () => {
        const ds = gdal.open('temp', 'w', 'MEM', 16, 16, 1, gdal.GDT_Byte)
        const band = ds.bands.get(1)
        ds.close()
        assert.throws(() => {
          band.fill(5)
        })
      })
    })
  })
})
